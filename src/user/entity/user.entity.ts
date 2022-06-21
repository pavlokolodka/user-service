import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/posts/entity/posts.entity";
import { UserRoles } from "src/roles/entity/user-roles.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'users'})
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({unique: true})
  email: string
 
  @ApiProperty()
  @Column()
  password: string

  @ApiProperty()
  @Column({name: 'is_banned', default: false})
  banned: boolean

  @ApiProperty()
  @Column({name: 'ban_reason', nullable: true})
  banReason: string

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserRoles, userRoles => userRoles.user)
  public userRoles!: UserRoles[];

  @OneToMany(() => Post, posts => posts.user)
  posts: Post[];
}