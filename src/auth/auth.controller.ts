import { Body, Controller, Post } from '@nestjs/common';
import { ModuleTokenFactory } from '@nestjs/core/injector/module-token-factory';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}


  @ApiResponse({
    status: 200,
    description: 'login',
    type: 'string'
  })
  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiResponse({
    status: 200,
    description: 'register',
    type: 'string'
  })
  @Post('register')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
