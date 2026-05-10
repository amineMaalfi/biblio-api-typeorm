import { Controller, Get } from '@nestjs/common';
import { BorrowingRulesService } from '../borrowing/borrowing-rules.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly borrowingRules: BorrowingRulesService) {}

  /** Public borrowing rules for the storefront (no secrets). */
  @Get('public')
  publicSettings() {
    return {
      lateFeePerDayDh: this.borrowingRules.lateFeePerDayDh,
      durationOptions: this.borrowingRules.getDurationOptions(),
    };
  }
}
