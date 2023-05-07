import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const data = await this.todoRepository.save(createTodoDto);
    return data;
  }

  async findAll() {
    return await this.todoRepository.find();
  }
  async find(query: any) {
    const data = await this.todoRepository.find({ where: query });
    return data;
  }
  async findOne(id: number) {
    const data = await this.todoRepository.findOneBy({ id });
    if (!data)
      throw new NotFoundException({
        status: 'Not Found',
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    return data;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const data = await this.todoRepository.update({ id }, updateTodoDto);
    if (!data)
      throw new NotFoundException({
        status: 'Not Found',
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });

    return await this.findOne(id);
  }

  async remove(id: number) {
    const data = await this.todoRepository.delete({ id });
    if (data.affected === 0)
      throw new NotFoundException({
        status: 'Not Found',
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    return;
  }
}
