import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'posts'})
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({unique: true})
  title: string
 
  @ApiProperty()
  @Column()
  content: string

  @ApiProperty()
  @Column()
  image: string

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}