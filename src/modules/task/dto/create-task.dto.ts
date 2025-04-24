import { IsString, MaxLength } from 'class-validator';

enum Importance {
  importance1 = 'Важная и срочная',
  importance2 = 'Важная, но несрочная',
  importance3 = 'Срочная, но неважная',
  importance4 = 'Навжная и несрочная',
}

enum Status {
  status1 = 'Создано',
  status2 = 'В работе',
  status3 = 'Выполнено',
}

export class CreateTaskDto {
  @IsString()
  @MaxLength(40)
  title: string;

  @IsString()
  @MaxLength(100)
  description: string;

  @IsString()
  importance: Importance;

  @IsString()
  status: Status;
}
// вынести в отдельную ветки создание  слоев для тасков + исправить несостыковки в контроллере
