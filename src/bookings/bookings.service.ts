import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BorrowingRulesService } from '../borrowing/borrowing-rules.service';
import { Book } from '../books/book.entity';
import type { AuthUser } from '../auth/current-user.decorator';
import { Booking, BookingStatus } from './booking.entity';
import type { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    @InjectRepository(Book)
    private readonly books: Repository<Book>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly borrowingRules: BorrowingRulesService,
  ) {}

  async checkout(userId: number, dto: CheckoutDto) {
    return this.dataSource.transaction(async (manager) => {
      const bookingRepo = manager.getRepository(Booking);
      const bookRepo = manager.getRepository(Book);
      const created: Booking[] = [];

      for (const line of dto.items) {
        const book = await bookRepo.findOne({ where: { id: line.bookId } });
        if (!book) {
          throw new NotFoundException(`Book not found: ${line.bookId}`);
        }
        if (book.stock <= 0) {
          throw new BadRequestException(`No stock for book: ${book.title}`);
        }
        let expected: number;
        try {
          expected = this.borrowingRules.expectedLineTotal(
            book.priceDh,
            line.durationDays,
          );
        } catch {
          throw new BadRequestException(
            `Unsupported duration: ${line.durationDays} days`,
          );
        }
        if (Math.abs(line.finalPriceDh - expected) > 0.01) {
          throw new BadRequestException(
            `Price mismatch for "${book.title}": expected ${expected} DH, got ${line.finalPriceDh} DH`,
          );
        }

        const due = new Date();
        due.setDate(due.getDate() + line.durationDays);

        book.stock -= 1;
        await bookRepo.save(book);

        const booking = bookingRepo.create({
          userId,
          bookId: book.id,
          durationDays: line.durationDays,
          totalDh: line.finalPriceDh,
          dueDate: due,
          status: BookingStatus.ACTIVE,
        });
        const saved = await bookingRepo.save(booking);
        saved.book = book;
        created.push(saved);
      }

      return created.map((b) => this.present(b));
    });
  }

  async findForUser(actor: AuthUser) {
    const qb = this.bookings
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.book', 'book')
      .leftJoinAndSelect('b.user', 'user')
      .orderBy('b.createdAt', 'DESC');

    if (!actor.isLibrarian) {
      qb.where('b.userId = :uid', { uid: actor.id });
    }

    const list = await qb.getMany();
    return list.map((x) => this.present(x));
  }

  async cancel(bookingId: string, actor: AuthUser) {
    return this.releaseBooking(bookingId, actor, BookingStatus.CANCELLED);
  }

  /** Physical return: frees stock like cancel but marks RETURNED (for librarian stats / UX). */
  async returnBook(bookingId: string, actor: AuthUser) {
    return this.releaseBooking(bookingId, actor, BookingStatus.RETURNED);
  }

  private async releaseBooking(
    bookingId: string,
    actor: AuthUser,
    terminalStatus: BookingStatus.CANCELLED | BookingStatus.RETURNED,
  ) {
    return this.dataSource.transaction(async (manager) => {
      const bookingRepo = manager.getRepository(Booking);
      const bookRepo = manager.getRepository(Book);

      const booking = await bookingRepo.findOne({
        where: { id: bookingId },
        relations: ['book', 'user'],
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      if (!actor.isLibrarian && booking.userId !== actor.id) {
        throw new ForbiddenException('Not allowed for this booking');
      }
      if (booking.status !== BookingStatus.ACTIVE) {
        throw new BadRequestException('Booking is not active');
      }

      const book = await bookRepo.findOne({ where: { id: booking.bookId } });
      if (book) {
        book.stock += 1;
        await bookRepo.save(book);
      }
      booking.status = terminalStatus;
      await bookingRepo.save(booking);
      return this.present(booking);
    });
  }

  private present(booking: Booking) {
    return {
      id: booking.id,
      status: booking.status,
      createdAt: booking.createdAt,
      dueDate: booking.dueDate,
      durationDays: booking.durationDays,
      totalDh: booking.totalDh,
      book: booking.book
        ? {
            id: booking.book.id,
            title: booking.book.title,
            author: booking.book.author,
          }
        : undefined,
      userId: booking.userId,
      userEmail: booking.user?.email,
    };
  }
}
