import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    const data = await this.activityRepository.save(createActivityDto);
    return data;
  }

  async findAll() {
    return await this.activityRepository.find();
  }

  async findOne(id: number) {
    const data = await this.activityRepository.findOne({ where: { id } });
    if (!data)
      throw new NotFoundException({
        status: 'Not Found',
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });
    return data;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const data = await this.activityRepository.update(
      { id },
      updateActivityDto,
    );
    if (data.affected === 0)
      throw new NotFoundException({
        status: 'Not Found',
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });

    return await this.findOne(id);
  }

  async remove(id: number) {
    const data = await this.activityRepository.delete({ id });
    if (data.affected === 0)
      throw new NotFoundException({
        status: 'Not Found',
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });
    return;
  }
}
