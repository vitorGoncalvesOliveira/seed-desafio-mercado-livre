import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';

describe('UserService', () => {
  let service: UserService;
  const fakeUserPrismaService = {
    users: [],
    user: {
      create: ({ data }) => {
        data.createdAt = new Date();
        return data;
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: fakeUserPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return password encrypt', async () => {
    const user = await service.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '1234',
    });

    expect(user.password).not.toBeUndefined();
    expect(user.password).not.toBe('1234');
    expect(user.createdAt).not.toBe(null);
  });
});
