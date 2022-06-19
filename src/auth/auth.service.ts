import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }


  
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    
    if (candidate) {
      throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 6);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    return await this.generateToken(user);
  }


  private async generateToken(user: User) {
    let roles = [];

    for (let i = 0; i < user.userRoles.length; i++) {
      roles.push(user.userRoles[i].role);
    }
    
    const payload = {email: user.email, id: user.id, roles: roles}

    return {
      token: this.jwtService.sign(payload)
    }
  }


  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const checkPassword = await bcrypt.compare(userDto.password, user.password);

    if (user && checkPassword) {
      return user;
    }

    throw new UnauthorizedException({message: 'Wrong email or password'})
  }
}
