import { Module } from '@nestjs/common';
import { BorrowingRulesService } from './borrowing-rules.service';

@Module({
  providers: [BorrowingRulesService],
  exports: [BorrowingRulesService],
})
export class BorrowingModule {}
