import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('ban')
  addBan(@Body() dto: BanUserDto) {
    return this.userService.addBan(dto);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
