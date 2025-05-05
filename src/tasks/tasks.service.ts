import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description for Task 1',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user1',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description for Task 2',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user2',
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(task: Partial<Task>): Task {
    const newTask = {
      ...task,
      id: (this.tasks.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Task;
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updatedTask: Partial<Task>): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return null;
    }
    const updatedTaskData = {
      ...this.tasks[taskIndex],
      ...updatedTask,
      updatedAt: new Date(),
    };
    this.tasks[taskIndex] = updatedTaskData;
    return updatedTaskData;
  }

  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return false;
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
