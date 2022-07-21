import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreateCategoryDTO } from './DTO/create.category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(category: CreateCategoryDTO) {
    return this.prismaService.category.create({
      data: {
        name: category.name,
        mother_category: {
          connectOrCreate: {
            create: { name: category.motherCategory },
            where: { name: category.motherCategory },
          },
        },
      },
    });
  }

  async findOneByName(name: string): Promise<Category> {
    return this.prismaService.category.findFirst({
      where: {
        name,
      },
    });
  }
}
