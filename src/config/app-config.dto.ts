import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class ConfigSequelize {
  @IsNumber()
  @Type(() => Number)
  port: number;

  @IsString()
  host: string;

  @IsString()
  database: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class AppConfigDto {
  @IsNumber()
  @Type(() => Number)
  port: number;

  @ValidateNested()
  @Transform(({ value }) => plainToInstance(ConfigSequelize, value))
  postgres: ConfigSequelize;
}
