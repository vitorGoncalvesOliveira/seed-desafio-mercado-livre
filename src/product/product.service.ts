import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Product } from '@prisma/client';
import { ProductCreateDTO } from './DTO/produc.create.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async createProduct(product: ProductCreateDTO): Promise<Product> {
    return this.prismaService.product.create({
      data: {
        amount: product.amount,
        name: product.name,
        detail: product.detail,
        value: product.value,
        characters: product.characters.toString(),
        category: {
          connectOrCreate: {
            create: { name: product.category },
            where: { name: product.category },
          },
        },
        user: {
          connect: {
            id: product.user_id,
          },
        },
      },
    });
  }
}
