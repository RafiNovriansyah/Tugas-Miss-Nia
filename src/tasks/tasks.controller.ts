import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Options,
  UseInterceptors,
  NestInterceptor,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CorsGuard } from '../cors.guard';
import { CorsInterceptor } from '../cors.interceptor';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(CorsGuard)
@UseInterceptors(CorsInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Options('*')
  @HttpCode(204)
  preflightResponse() {
    return;
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Get(':id/status')
  getTaskStatus(@Param('id') id: number) {
    return this.tasksService.getTaskStatus(id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Options('*')
  handleOptions() {
    return {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: 'Content-Type, Accept, Authorization',
      origin: 'http://localhost:5173',
      credentials: true,
    };
  }
}
