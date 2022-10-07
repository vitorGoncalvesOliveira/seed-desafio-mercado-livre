import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionRepository {
  constructor(private prismaService: PrismaService) {}
  async CreateQuestion(createQuestionDto: CreateQuestionDto) {
    return this.prismaService.question.create({
      data: {
        title: createQuestionDto.title,
        user: {
          connect: {
            id: createQuestionDto.id_user,
          },
        },
        product: {
          connect: {
            id: createQuestionDto.product_id,
          },
        },
      },
      include: {
        user: true,
        product: true,
      },
    });
  }
}
