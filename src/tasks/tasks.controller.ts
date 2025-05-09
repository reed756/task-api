import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): string {
    const createdTask = this.tasksService.createTask(createTaskDto);
    return `Task ${createdTask.id} created successfully`;
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): string {
    const updatedTask = this.tasksService.updateTask(id, updateTaskDto);
    if (!updatedTask) {
      return `Task #${id} not found`;
    }
    return `Task #${id} updated successfully`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string): string {
    const deletedTask = this.tasksService.deleteTask(id);
    if (!deletedTask) {
      return `Task #${id} not found`;
    }
    return `Task #${id} removed successfully`;
  }
}
