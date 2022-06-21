import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
  @ApiProperty()
  @IsNumber({}, {message: 'Must be a number'})
  readonly userId: number;
  @ApiProperty()
  @IsString({message: 'Must be a string'})
  readonly banReason: string;
}