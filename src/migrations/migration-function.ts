import { Logger } from '@nestjs/common';
import dataSource from '../config/typeorm-cli.config';

export async function migrate() {
  const logger = new Logger('Migrations');
  try {
    logger.log('Starting migrations ...');
    await dataSource.initialize();
    await dataSource.runMigrations();
    logger.log('Migrations completed!');
  } catch (error) {
    logger.error('Error while running migrations', error);
    process.exit(0);
  }
}
