import { IsEnum, IsString, MaxLength } from 'class-validator';

enum Importance {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

enum Status {
  created = 'created',
  progress = 'progress',
  done = 'done',
}

export class CreateTaskDto {
  @IsString()
  @MaxLength(40)
  title: string;

  @IsString()
  @MaxLength(100)
  description: string;

  @IsEnum(Importance)
  importance: Importance;

  @IsEnum(Status)
  status: Status;
}
