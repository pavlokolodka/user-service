import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';


@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(private postService: PostsService) {}
  
  @ApiResponse({
    status: 200,
    description: 'create new post',
    type: Post
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto,
             @UploadedFile() image) {
    return this.postService.create(dto, image);
  }
}
