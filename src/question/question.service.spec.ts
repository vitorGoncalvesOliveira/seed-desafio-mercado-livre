import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            question: {
              create: ({ data }) => {
                data.id = 1;
                return data;
              },
            },
          },
        },
        QuestionService,
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a new question', () => {
    const result = service.create({
      id_user: 1,
      product_id: 1,
      title: 'teste',
    });
    expect(result).toEqual({
      id: 1,
      title: 'teste',
      user: {
        connect: {
          id: 1,
        },
      },
      product: {
        connect: {
          id: 1,
        },
      },
    });
  });
});
