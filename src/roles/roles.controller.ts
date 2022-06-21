import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/roles.entity';
import { RolesService } from './roles.service';
@ApiTags('Roles')
@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) {}


  @ApiResponse({
    status: 200,
    description: 'get role entity',
    type: Role
  })
  @Get(':role')
  @UseGuards(JwtAuthGuard)
  getByRole(@Param('role') role: string) {
    return this.roleService.getByRole(role);
  }
  
  @ApiResponse({
    status: 200,
    description: 'create new role',
    type: Role
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
}
