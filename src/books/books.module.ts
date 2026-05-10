import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../bookings/booking.entity';
import { BooksController } from './books.controller';
import { Book } from './book.entity';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Booking])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService, TypeOrmModule],
})
export class BooksModule {}
