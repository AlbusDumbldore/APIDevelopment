import { IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(40)
  title: string;

  @IsString()
  @MaxLength(100)
  description: string;

  @IsString()
  importance: string;

  @IsString()
  status: string;
}
// вынести в отдельную ветки создание  слоев для тасков + исправить несостыковки в контроллере
