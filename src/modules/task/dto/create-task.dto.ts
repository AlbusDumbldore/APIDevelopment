import { IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(40)
  taskName: string;

  @IsString()
  @MaxLength(100)
  description: string;

  @IsString()
  importance: string;

  @IsString()
  status: string;
}
