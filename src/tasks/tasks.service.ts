import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);

    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  findAll() {
    return this.prisma.task.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.task.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
