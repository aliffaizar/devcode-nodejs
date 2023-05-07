import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariable {
  @IsNotEmpty()
  @IsString()
  MYSQL_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  MYSQL_PORT: number;

  @IsNotEmpty()
  @IsString()
  MYSQL_USER: string;

  @IsNotEmpty()
  @IsString()
  MYSQL_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  MYSQL_DBNAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
