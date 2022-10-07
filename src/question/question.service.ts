import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.CreateQuestion(createQuestionDto);
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
