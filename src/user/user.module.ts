import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { IsEmailAlreadyExistConstraint } from './IsEmailAlreadyExist.constraint';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [PrismaService, UserService, IsEmailAlreadyExistConstraint],
})
export class UserModule {}
