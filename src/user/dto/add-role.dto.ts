import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty()
  @IsString({message: 'Must be a string'})
  readonly value: string;
  @ApiProperty()
  @IsNumber({}, {message: 'Must be a number'})
  readonly userId: number;
}