import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { useContainer } from 'class-validator';

import { PrismaService } from '../src/infrastructure/prisma/prisma.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const prismaService = new PrismaService();
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  it('/category (POST) create a category sucessfuly', async () => {
    await prismaService.category.deleteMany({});
    const { status, body } = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'teste',
      });
    expect(status).toBe(201);
    expect(body.name).toBe('teste');
    expect(body.createdAt).toBeDefined();
  });

  it('/category (POST) category name not to be empty', async () => {
    await prismaService.category.deleteMany({});
    const { status, body } = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: '',
      });
    expect(status).toBe(400);
    expect(body.message).toEqual(['name should not be empty']);
  });

  it('/category (POST) category name already exist', async () => {
    await prismaService.category.deleteMany({});
    await request(app.getHttpServer()).post('/category').send({
      name: 'teste',
    });
    const { status, body } = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'teste',
      });
    expect(status).toBe(400);
    expect(body.message).toEqual(['Category already exist']);
  });

  it('/category (POST) create a category with mother category', async () => {
    await prismaService.category.deleteMany({});

    const { status, body } = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'teste',
        motherCategory: 'teste1',
      });
    console.log({ body });
    expect(status).toBe(201);
  });
});
