import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/pagination.dto';

export class FindAllTaskDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;
}
