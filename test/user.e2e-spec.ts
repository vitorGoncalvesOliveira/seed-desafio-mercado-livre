import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { useContainer } from 'class-validator';

import { PrismaService } from '../src/prisma.service';

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

  it('/user (POST) create user sucessfuly', async () => {
    await prismaService.user.deleteMany({});
    const { status, body } = await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456',
      });
    expect(status).toBe(201);
    expect(body.name).toBe('teste');
    expect(body.passport).not.toBe('123456');
  });

  it('/user (POST), password should has at least 6 character', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'teste',
        email: 'teste15@teste.com',
        password: '1234',
      });
    expect(status).toBe(400);
    expect(body.message).toEqual(['Password has to be at least 6 characters']);
  });

  it('/user (POST), login not be empty', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'teste',
        email: '',
        password: '',
      });
    expect(status).toBe(400);
    expect(body.message).toEqual([
      'email must be an email',
      'Password has to be at least 6 characters',
      'password should not be empty',
    ]);
  });

  it('/user (POST), login not be duplicated', async () => {
    await prismaService.user.deleteMany({});
    await request(app.getHttpServer()).post('/user').send({
      name: 'teste',
      email: 'teste2@teste.com',
      password: '123456',
    });
    const { status, body } = await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'teste',
        email: 'teste2@teste.com',
        password: '123456',
      });
    expect(status).toBe(400);
    expect(body.message).toEqual(['E-mail already exist']);
  });
});
