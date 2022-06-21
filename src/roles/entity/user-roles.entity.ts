import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/entity/roles.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'user_roles'})
export class UserRoles {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number

  @ApiProperty()
  @Column()
  public userId!: number;

  @ApiProperty()
  @Column()
  public roleId!: number;

  @ManyToOne(() => User, user => user.userRoles)
  public user!: User;

  @ManyToOne(() => Role, role => role.userRoles)
  public role!: Role;
}