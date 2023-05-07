import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type Priority = 'very-low' | 'low' | 'medium' | 'high' | 'very-high';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity_group_id: number;

  @Column()
  title: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({
    type: 'enum',
    enum: ['very-low', 'low', 'medium', 'high', 'very-high'],
    default: 'very-high',
  })
  priority: Priority;

  @CreateDateColumn()
  created_at: Date;
}
