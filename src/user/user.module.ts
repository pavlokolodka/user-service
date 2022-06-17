import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoles } from 'src/roles/entity/user-roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRoles]), RolesModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
