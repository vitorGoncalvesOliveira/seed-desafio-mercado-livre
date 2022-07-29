import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductCreateDTO } from './DTO/produc.create.dto';

import { ProductService } from './product.service';

interface uploadImage {
  productId: string;
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() data: ProductCreateDTO,
  ): Promise<Product> {
    data.user_id = req.user.userId;
    return this.productService.createProduct(data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async updateImage(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: uploadImage,
  ): Promise<any> {
    try {
      return this.productService.uploadImage(
        req.user.userId,
        data.productId,
        file.buffer.toString(),
        file.originalname,
      );
    } catch (e) {
      return e;
    }
  }
}
