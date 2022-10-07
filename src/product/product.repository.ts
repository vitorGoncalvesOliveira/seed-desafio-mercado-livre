import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { ProductCreateDTO } from './DTO/produc.create.dto';

@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async saveProduct(product: ProductCreateDTO) {
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

  async findProductById(productId: number) {
    return this.prismaService.product.findUnique({
      where: { id: productId },
    });
  }
}
