import { Module } from '@nestjs/common';
import { BorrowingModule } from '../borrowing/borrowing.module';
import { SettingsController } from './settings.controller';

@Module({
  imports: [BorrowingModule],
  controllers: [SettingsController],
})
export class SettingsModule {}
