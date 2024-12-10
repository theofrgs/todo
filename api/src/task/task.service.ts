import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto) {
    return this.taskRepository.save(this.taskRepository.create(dto));
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: string) {
    return this.taskRepository.find({ where: { id } });
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: { id } });
    Object.assign(task, dto);
    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    return this.taskRepository.remove(
      await this.taskRepository.findOne({ where: { id } }),
    );
  }
}
