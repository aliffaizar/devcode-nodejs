import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ValidationFilter } from 'src/http-exception/validation.filter';

@Controller('activity-groups')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseFilters(new ValidationFilter())
  async create(@Body() createActivityDto: CreateActivityDto) {
    const data = await this.activitiesService.create(createActivityDto);
    return { status: 'Success', message: 'Success', data };
  }

  @Get()
  async findAll() {
    const data = await this.activitiesService.findAll();
    return { status: 'Success', message: 'Success', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.activitiesService.findOne(+id);
    return { status: 'Success', message: 'Success', data };
  }

  @Patch(':id')
  @UseFilters(new ValidationFilter())
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    const data = await this.activitiesService.update(+id, updateActivityDto);
    return { status: 'Success', message: 'Success', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.activitiesService.remove(+id);
    return { status: 'Success', message: 'Success', data: {} };
  }
}
