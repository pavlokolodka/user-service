import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/roles/entity/user-roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRoles) private userRolesRopository: Repository<UserRoles>,
    private roleService: RolesService,
  ) {}


  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    await this.userRepository.save(user);

    const role = await this.roleService.getByRole('USER');

    await this.userRolesRopository.save({
      user: user,
      role: role
    });
   
    return this.userRepository.findOne({where: {id: user.id}, relations: ['userRoles', 'userRoles.role']}); 
  }


  async getAllUsers(): Promise<User[]>{
    const users = await this.userRepository.find({relations: ['userRoles', 'userRoles.role']});
    return users;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne({where: {id: dto.userId}})
    const role = await this.roleService.getByRole(dto.value);

    if (user && role) {
      await this.userRolesRopository.save({
        user: user,
        role: role
      })

      return dto;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async addBan(dto: BanUserDto) {
    const user = await this.userRepository.findOne({where: {id: dto.userId}});

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    user.banned = true;
    user.banReason = dto.banReason;

    await this.userRepository.save(user);

    return user;
  }

  async getUserByEmail(email: string): Promise<User>{
    const user = await this.userRepository.findOne({where: {email: email}, relations: ['userRoles', 'userRoles.role']});
    return user;
  }
}
