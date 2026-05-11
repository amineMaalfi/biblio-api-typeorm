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
  @IsString({ message: 'Le titre est requis.' })
  @MinLength(1, { message: 'Le titre est requis.' })
  title: string;

  @IsString({ message: 'L’auteur est requis.' })
  @MinLength(1, { message: 'L’auteur est requis.' })
  author: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @Min(0, { message: 'Le prix ne peut pas être négatif.' })
  priceDh: number;

  @IsString({ message: 'La catégorie est requise.' })
  @MinLength(1, { message: 'La catégorie est requise.' })
  category: string;

  @Type(() => Number)
  @IsInt({ message: 'Le stock doit être un nombre entier.' })
  @Min(0, { message: 'Le stock ne peut pas être négatif.' })
  stock: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La note doit être un nombre entier.' })
  @Min(1, { message: 'La note doit être comprise entre 1 et 5.' })
  @Max(5, { message: 'La note doit être comprise entre 1 et 5.' })
  rating?: number;

  @IsString({ message: 'L’URL de l’image est requise.' })
  @MinLength(1, { message: 'L’URL de l’image est requise.' })
  imageUrl: string;

  @IsOptional()
  @IsString({ message: 'Le résumé doit être une chaîne de caractères.' })
  summary?: string;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
