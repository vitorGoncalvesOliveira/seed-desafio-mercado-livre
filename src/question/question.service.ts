import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.prisma.question.create({
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

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
