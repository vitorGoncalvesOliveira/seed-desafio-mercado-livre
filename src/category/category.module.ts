import { Module } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { IsCategoryExistConstraint } from './IsCategoryExist.constraint';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, IsCategoryExistConstraint],
})
export class CategoryModule {}
