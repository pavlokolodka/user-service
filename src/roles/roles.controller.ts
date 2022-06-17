import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) {}


  @Get(':role')
  getByRole(@Param('role') role: string) {
    return this.roleService.getByRole(role);
  }
  
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
}
