import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty({ message: 'title cannot be null' })
  title: string;

  @IsNotEmpty({ message: 'email cannot be null' })
  @IsOptional()
  email: string;
}
