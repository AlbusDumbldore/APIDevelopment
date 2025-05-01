import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AppConfigDto {
  @IsNumber()
  @Type(() => Number)
  port: number;
}

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
