import { Injectable, NotFoundException } from '@nestjs/common';  
import { InjectRepository } from '@nestjs/typeorm';  
import { Repository } from 'typeorm';  
import { Task, TaskStatus } from './task.entity';  
import { CreateTaskDto } from './dto/create-task.dto';  
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()  
export class TasksService {  
  constructor(  
    @InjectRepository(Task)  
    private taskRepository: Repository<Task>  
  ) {}  

  async create(createTaskDto: CreateTaskDto): Promise<Task> {  
    const task = this.taskRepository.create(createTaskDto);  
    return this.taskRepository.save(task);  
  }  

  async getTasks(): Promise<Task[]> {  
    return this.taskRepository.find();  
  }  

  async getTaskById(id: number): Promise<Task> {  
    const task = await this.taskRepository.findOne({ where: { id } });  
    if (!task) {  
      throw new NotFoundException(`Task with ID ${id} not found`);  
    }  
    return task;  
  }  

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {  
    const task = await this.getTaskById(id);  
    Object.assign(task, updateTaskDto);  
    return this.taskRepository.save(task);  
  }

  async getTaskStatus(id: number): Promise<TaskStatus> {  
    const task = await this.getTaskById(id);  
    return task.status;  
  }  

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {  
    const task = await this.getTaskById(id);  
    task.status = status;  
    return this.taskRepository.save(task);  
  }

  async deleteTask(id: number): Promise<void> {  
    await this.taskRepository.delete(id);  
  }  
}