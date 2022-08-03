import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { QuestionResolver } from './question/question.resolver';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    CategoryModule,
    ProductModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    QuestionResolver,
  ],
})
export class AppModule {}
