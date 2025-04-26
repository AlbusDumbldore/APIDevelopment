import { IsNotEmpty, IsString } from 'class-validator';

export class IdStringDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
