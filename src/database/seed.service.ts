import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';
import { SEED_BOOKS } from './seed-books';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Book)
    private readonly books: Repository<Book>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedLibrarian();
    await this.seedBooksIfEmpty();
  }

  private async seedLibrarian(): Promise<void> {
    const existing = await this.users.count({ where: { isLibrarian: true } });
    if (existing > 0) {
      return;
    }
    const email = this.config.get<string>('LIBRARIAN_EMAIL')?.toLowerCase();
    const password = this.config.get<string>('LIBRARIAN_PASSWORD');
    const fullName =
      this.config.get<string>('LIBRARIAN_FULL_NAME') ?? 'Bibliothécaire';
    if (!email || !password) {
      this.logger.warn(
        'No librarian user seeded: set LIBRARIAN_EMAIL and LIBRARIAN_PASSWORD in .env',
      );
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await this.users.save(
      this.users.create({
        email,
        fullName,
        password: passwordHash,
        isLibrarian: true,
      }),
    );
    this.logger.log(`Seeded librarian account for ${email}`);
  }

  private async seedBooksIfEmpty(): Promise<void> {
    const n = await this.books.count();
    if (n > 0) {
      return;
    }
    const rows = SEED_BOOKS.map((b) =>
      this.books.create({
        title: b.title,
        author: b.author,
        priceDh: b.priceDh,
        category: b.category,
        stock: b.stock,
        rating: b.rating,
        imageUrl: b.imageUrl,
        summary: b.summary,
      }),
    );
    await this.books.save(rows);
    this.logger.log(`Seeded ${rows.length} books`);
  }
}
