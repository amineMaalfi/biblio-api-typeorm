import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BorrowingRulesService {
  constructor(private readonly config: ConfigService) {}

  get lateFeePerDayDh(): number {
    return Number(this.config.get('LATE_FEE_PER_DAY_DH') ?? 5);
  }

  /** Extra fee in DH for a given loan duration (days). */
  extraFeeForDuration(days: number): number {
    const map = this.parseDurationFees();
    if (!(days in map)) {
      throw new Error(`Unsupported loan duration: ${days}`);
    }
    return map[days];
  }

  expectedLineTotal(priceDh: number, durationDays: number): number {
    return priceDh + this.extraFeeForDuration(durationDays);
  }

  getDurationOptions(): { days: number; extraFeeDh: number }[] {
    const map = this.parseDurationFees();
    return Object.keys(map)
      .map((k) => Number(k))
      .sort((a, b) => a - b)
      .map((days) => ({ days, extraFeeDh: map[days] }));
  }

  private parseDurationFees(): Record<number, number> {
    const raw =
      this.config.get<string>('DURATION_EXTRA_FEES_JSON') ??
      '{"7":0,"15":10,"30":20,"60":40,"90":60}';
    try {
      const parsed = JSON.parse(raw) as Record<string, number>;
      const out: Record<number, number> = {};
      for (const [k, v] of Object.entries(parsed)) {
        out[Number(k)] = Number(v);
      }
      return out;
    } catch {
      return { 7: 0, 15: 10, 30: 20, 60: 40, 90: 60 };
    }
  }
}
