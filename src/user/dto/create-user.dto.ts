import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString({message: 'Must be a string'})
  @IsEmail({}, { message: 'Invalid email message' })
  readonly email: string;
  @ApiProperty()
  @IsString({message: 'Must be a string'})
  @Length(4, 18, {message: 'Not less than 4 and not more than 18'})
  readonly password: string;
}