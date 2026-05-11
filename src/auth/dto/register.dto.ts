import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Le nom complet est requis.' })
  @MinLength(1, { message: 'Le nom complet est requis.' })
  fullName: string;

  @IsEmail({}, { message: 'Adresse e-mail invalide.' })
  email: string;

  @IsString({ message: 'Le mot de passe est requis.' })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'Le secret bibliothécaire doit être une chaîne.' })
  librarianSecret?: string;
}
