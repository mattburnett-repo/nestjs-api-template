import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'

import { hash } from 'argon2'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

//  if there are errors about uuid_v4, go into Postgres cmd line / pgAdmin / etc. and run
//    create extension "uuid-ossp";
//  like a query
@Entity()
export class User {
  // hash the password before insert / update
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // TODO: this needs a salt
    this.password = await hash(this.password)
  }

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsNotEmpty()
  id: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string

  @Column({ unique: true, nullable: false })
  @IsNotEmpty()
  @IsString()
  username: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string

  @Column({ unique: true, nullable: true })
  @IsString()
  email: string

  @Column({ nullable: true })
  refreshToken: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
