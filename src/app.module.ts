import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { BooksModule } from './books/books.module';
import { Booking } from './bookings/booking.entity';
import { Book } from './books/book.entity';
import { SeedModule } from './database/seed.module';
import { SettingsModule } from './settings/settings.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DATABASE_FILE', 'biblio.sqlite'),
        entities: [User, Book, Booking],
        synchronize: true,
        logging: config.get<string>('TYPEORM_LOGGING') === 'true',
      }),
    }),
    AuthModule,
    BooksModule,
    BookingsModule,
    SettingsModule,
    SeedModule,
  ],
})
export class AppModule {}
