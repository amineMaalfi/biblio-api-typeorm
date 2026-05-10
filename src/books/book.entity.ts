import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  /** Base borrow price in Moroccan dirhams (numeric part shown in the UI). */
  @Column({ type: 'float' })
  priceDh: number;

  /** Category label as used in the storefront (e.g. Horreur, Théâtre). */
  @Column({ type: 'varchar', length: 64 })
  category: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'int', default: 5 })
  rating: number;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'text', default: '' })
  summary: string;

  @OneToMany(() => Booking, (b) => b.book)
  bookings: Booking[];
}
