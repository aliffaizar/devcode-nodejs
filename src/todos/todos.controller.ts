import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ValidationFilter } from 'src/http-exception/validation.filter';

@Controller('todo-items')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseFilters(new ValidationFilter())
  async create(@Body() createTodoDto: CreateTodoDto) {
    const data = await this.todosService.create(createTodoDto);
    return { status: 'Success', message: 'Success', data };
  }

  @Get()
  async findAll(@Query() query: any) {
    if (query) {
      const data = await this.todosService.find(query);
      return { status: 'Success', message: 'Success', data };
    } else {
      const data = await this.todosService.findAll();
      return { status: 'Success', message: 'Success', data };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.todosService.findOne(+id);
    return { status: 'Success', message: 'Success', data };
  }

  @Patch(':id')
  @UseFilters(new ValidationFilter())
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const data = await this.todosService.update(+id, updateTodoDto);
    return { status: 'Success', message: 'Success', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.todosService.remove(+id);
    return { status: 'Success', message: 'Success', data: {} };
  }
}
