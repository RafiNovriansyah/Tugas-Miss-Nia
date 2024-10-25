import { TaskStatus } from '../task.entity';  
import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';  

export class UpdateTaskDto {  
  @IsOptional()  
  @IsString()  
  task?: string;  

  @IsOptional()  
  @IsDate()  
  dimulai?: Date;  

  @IsOptional()  
  @IsDate()  
  selesai?: Date;  

  @IsOptional()  
  @IsEnum(TaskStatus)  
  status?: TaskStatus;  
}