import { IsUUID } from 'class-validator'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string

  @Column({ nullable: true })
  testString: string

  @Column()
  testNumber: number

  @Column({ default: true })
  isActive: boolean

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
