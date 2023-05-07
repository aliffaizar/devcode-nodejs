import { IsNotEmpty, IsOptional } from 'class-validator';

import { Priority } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'activity_group_id cannot be null' })
  activity_group_id: number;

  @IsNotEmpty({ message: 'title cannot be null' })
  title: string;

  @IsOptional()
  priority: Priority;

  @IsOptional()
  is_active: boolean;
}
