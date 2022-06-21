import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @ApiResponse({
    status: 200,
    description: 'get all users',
    type: [User]
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiResponse({
    status: 200,
    description: 'create user role',
    type: AddRoleDto
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'add ban to user',
    type: User
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  addBan(@Body() dto: BanUserDto) {
    return this.userService.addBan(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'create new user',
    type: User
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
