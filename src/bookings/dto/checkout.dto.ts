import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CheckoutLineDto {
  @IsUUID()
  bookId: string;

  @IsInt()
  @Min(1)
  durationDays: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  finalPriceDh: number;
}

export class CheckoutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CheckoutLineDto)
  items: CheckoutLineDto[];
}
