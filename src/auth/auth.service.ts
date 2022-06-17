import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}
  
  async login(userDto: CreateUserDto) {
    
  }


  
  async registration(userDto: CreateUserDto) {
    
  }
}
