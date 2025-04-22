import { IsInt, IsNumber } from 'class-validator';

export class DeleteTaskDto {
  @IsNumber()
  @IsInt()
  Id: number;
}
