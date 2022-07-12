import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { IsEmailAlreadyExistConstraint } from './IsEmailAlreadyExist.constraint';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    AuthService,
    UserService,
    IsEmailAlreadyExistConstraint,
    JwtService,
  ],
})
export class UserModule {}
