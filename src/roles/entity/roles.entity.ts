import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoles } from "./user-roles.entity";


@Entity({name: 'roles'})
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({unique: true})
  value: string

  @ApiProperty()
  @Column()
  description: string

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserRoles, userRoles => userRoles.role)
  public userRoles!: UserRoles[];
}