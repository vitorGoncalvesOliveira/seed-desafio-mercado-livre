import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: ({ data }) => {
                data.createdAt = new Date();
                return data;
              },
            },
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should return a new Product', async () => {
    const product = await productService.createProduct({
      amount: 10,
      category: 'teste',
      characters: ['teste', 'test'],
      detail: 'teste de um produto',
      name: 'teste',
      user_id: 1,
      value: 30.2,
    });

    expect(product.createdAt).toBeDefined();

    delete product.createdAt;
    expect(product).toEqual({
      amount: 10,
      category: {
        connectOrCreate: {
          create: { name: 'teste' },
          where: { name: 'teste' },
        },
      },
      characters: 'teste,test',
      detail: 'teste de um produto',
      name: 'teste',
      user: { connect: { id: 1 } },
      value: 30.2,
    });
  });
});
