import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @IsString()
  @Matches(/^0\d{9}$/, { message: 'Le numéro doit commencer par 0 et contenir 10 chiffres' })
  num_tel: string;
}
