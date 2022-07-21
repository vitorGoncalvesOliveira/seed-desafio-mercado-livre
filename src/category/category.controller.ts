import { Body, Controller, Post } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './DTO/create.category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() body: CreateCategoryDTO): Promise<Category> {
    return this.categoryService.create(body);
  }
}
