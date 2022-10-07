import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Product } from '@prisma/client';
import { ProductRepository } from './product.repository';
import { ProductCreateDTO } from './DTO/produc.create.dto';
import { UploadFile } from 'src/util/uploadfile';

interface productImageResponse {
  product: string;
  url: string;
  name: string;
}

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private prismaService: PrismaService,
    private uploadFile: UploadFile,
  ) {}

  async createProduct(product: ProductCreateDTO): Promise<Product> {
    return this.productRepository.saveProduct(product);
  }

  async findProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findProductById(productId);
    if (product) {
      return product;
    }
    throw new HttpException('product not found', HttpStatus.NOT_FOUND);
  }

  async uploadImage(
    user_id: number,
    productId: string,
    buffer: string,
    name: string,
  ): Promise<productImageResponse> {
    const product = await this.findProductById(parseInt(productId, 10));
    if (product.user_id !== user_id) {
      throw new HttpException(
        'Product not belong to user',
        HttpStatus.FORBIDDEN,
      );
    }

    const addressImg = await this.uploadFile.sendFile(name);
    const image = await this.prismaService.image.create({
      data: {
        url: addressImg.url,
        name: addressImg.name,
        products: {
          connect: {
            id: parseInt(productId, 10),
          },
        },
      },
      include: {
        products: true,
      },
    });
    return {
      product: image.products.name,
      url: image.url,
      name: image.name,
    };
  }
}
