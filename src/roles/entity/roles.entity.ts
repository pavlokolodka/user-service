import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoles } from "./user-roles.entity";

interface IRoleCreate {
  email: string,
  password: string
}

@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  value: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserRoles, userRoles => userRoles.role)
  public userRoles!: UserRoles[];
}