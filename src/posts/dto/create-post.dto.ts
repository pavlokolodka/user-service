import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly content: string;
  @ApiProperty()
  readonly userId: number;
}