import { IsInt, IsNumber } from 'class-validator';

export class IdTaskDto {
  @IsNumber()
  @IsInt()
  Id: number;
}
