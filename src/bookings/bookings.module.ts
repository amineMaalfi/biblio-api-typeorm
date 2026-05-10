import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowingModule } from '../borrowing/borrowing.module';
import { Book } from '../books/book.entity';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Book]),
    BorrowingModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
