import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({message: 'Must be a string'})
  @IsEmail({}, { message: 'Invalid email message' })
  readonly email: string;
  @IsString({message: 'Must be a string'})
  @Length(4, 18, {message: 'Not less than 4 and not more than 18'})
  readonly password: string;
}