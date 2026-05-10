import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  author: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceDh: number;

  @IsString()
  @MinLength(1)
  category: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsString()
  @MinLength(1)
  imageUrl: string;

  @IsOptional()
  @IsString()
  summary?: string;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
