import { TaskStatus } from '../task.entity';  
import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';  

export class CreateTaskDto {  
  @IsNotEmpty()  
  @IsString()  
  task: string;  

  @IsNotEmpty()  
  @IsDate()  
  dimulai: Date;  

  @IsNotEmpty()  
  @IsDate()  
  selesai: Date;  

  @IsNotEmpty()  
  @IsEnum(TaskStatus)  
  status: TaskStatus;  
}