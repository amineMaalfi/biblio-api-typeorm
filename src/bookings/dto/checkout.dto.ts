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
  @IsUUID('all', { message: 'Identifiant de livre invalide.' })
  bookId: string;

  @IsInt({ message: 'La durée doit être un nombre entier de jours.' })
  @Min(1, { message: 'La durée doit être d’au moins 1 jour.' })
  durationDays: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Le montant doit être un nombre.' })
  @Min(0, { message: 'Le montant ne peut pas être négatif.' })
  finalPriceDh: number;
}

export class CheckoutDto {
  @IsArray({ message: 'La liste des articles est invalide.' })
  @ArrayMinSize(1, { message: 'Le panier doit contenir au moins un article.' })
  @ValidateNested({ each: true })
  @Type(() => CheckoutLineDto)
  items: CheckoutLineDto[];
}
