import { Post } from "src/posts/entity/posts.entity";
import { UserRoles } from "src/roles/entity/user-roles.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  email: string
 
  @Column()
  password: string

  @Column({name: 'is_banned', default: false})
  banned: boolean

  @Column({name: 'ban_reason', nullable: true})
  banReason: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserRoles, userRoles => userRoles.user)
  public userRoles!: UserRoles[];

  @OneToMany(() => Post, posts => posts.user)
  posts: Post[];
}