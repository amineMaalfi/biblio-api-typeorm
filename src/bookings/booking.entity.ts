import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

export enum BookingStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Book, (b) => b.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column()
  bookId: string;

  @Column({ type: 'int' })
  durationDays: number;

  @Column({ type: 'float' })
  totalDh: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  dueDate: Date;

  @Column({
    type: 'varchar',
    length: 32,
    default: BookingStatus.ACTIVE,
  })
  status: BookingStatus;
}
