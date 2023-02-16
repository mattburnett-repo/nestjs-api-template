import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testString: string;

  @Column()
  testNumber: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  description: string;
}
