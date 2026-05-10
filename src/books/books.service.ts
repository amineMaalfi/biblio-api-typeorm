import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../bookings/booking.entity';
import { Book } from './book.entity';
import type { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';

export type PublicBook = {
  id: string;
  title: string;
  author: string;
  price: string;
  cat: string;
  stock: number;
  rating: number;
  img: string;
  summary: string;
};

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly books: Repository<Book>,
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
  ) {}

  toPublic(book: Book): PublicBook {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      price: `${Math.round(book.priceDh)} DH`,
      cat: book.category,
      stock: book.stock,
      rating: book.rating,
      img: book.imageUrl,
      summary: book.summary ?? '',
    };
  }

  findAll(): Promise<Book[]> {
    return this.books.find({ order: { title: 'ASC' } });
  }

  findOne(id: string): Promise<Book | null> {
    return this.books.findOne({ where: { id } });
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.books.create({
      title: dto.title,
      author: dto.author,
      priceDh: dto.priceDh,
      category: dto.category,
      stock: dto.stock,
      rating: dto.rating ?? 5,
      imageUrl: dto.imageUrl,
      summary: dto.summary ?? '',
    });
    return this.books.save(book);
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const book = await this.books.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    if (dto.title !== undefined) book.title = dto.title;
    if (dto.author !== undefined) book.author = dto.author;
    if (dto.priceDh !== undefined) book.priceDh = dto.priceDh;
    if (dto.category !== undefined) book.category = dto.category;
    if (dto.stock !== undefined) book.stock = dto.stock;
    if (dto.rating !== undefined) book.rating = dto.rating;
    if (dto.imageUrl !== undefined) book.imageUrl = dto.imageUrl;
    if (dto.summary !== undefined) book.summary = dto.summary;
    return this.books.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.books.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const active = await this.bookings.count({
      where: { bookId: id, status: BookingStatus.ACTIVE },
    });
    if (active > 0) {
      throw new BadRequestException(
        'Cannot delete a book that has active bookings',
      );
    }
    await this.books.remove(book);
  }
}
