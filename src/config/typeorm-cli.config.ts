import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

import { Activity } from 'src/activities/entities/activity.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { Initial1683408017463 } from 'src/migrations/1683408017463-initial';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST'),
  port: configService.get<number>('MYSQL_PORT'),
  username: configService.get<string>('MYSQL_USER'),
  password: configService.get<string>('MYSQL_PASSWORD'),
  database: configService.get<string>('MYSQL_DBNAME'),
  entities: [Activity, Todo],
  migrations: [Initial1683408017463],
  logging: false,
});
