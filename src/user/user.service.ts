import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/roles/entity/user-roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
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

    return user; 
  }


  async getAllUsers(): Promise<User[]>{
    const users = await this.userRepository.find({relations: ['userRoles']});
    return users;
  }
}
