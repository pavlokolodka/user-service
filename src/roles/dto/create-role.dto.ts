import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty()
  readonly value: string;
  @ApiProperty()
  readonly description: string;
}