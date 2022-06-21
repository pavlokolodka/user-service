import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entity/posts.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private fileService: FilesService
    ) {}
  
  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = this.postRepository.create({...dto, image: fileName});
    await this.postRepository.save(post);
    return post;
  }
}
