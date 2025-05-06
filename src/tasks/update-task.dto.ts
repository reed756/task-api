import { IsBoolean, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @Length(1, 50)
  title?: string;

  @IsString()
  @Length(1, 250)
  description?: string;

  @IsBoolean()
  completed?: boolean;
}
