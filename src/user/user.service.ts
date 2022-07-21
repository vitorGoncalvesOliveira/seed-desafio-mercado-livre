import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { Cripto } from '../cripto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await Cripto.hashPassword(data.password);
    return this.prisma.user.create({ data });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findOneByEmail(email): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
