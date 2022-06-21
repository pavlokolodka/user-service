import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  title: string
 
  @Column()
  content: string

  @Column()
  image: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}