import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { Product } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductCreateDTO } from './DTO/produc.create.dto';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() data: ProductCreateDTO,
  ): Promise<Product> {
    console.log(req.user);
    data.user_id = req.user.userId;
    return this.productService.createProduct(data);
  }
}
