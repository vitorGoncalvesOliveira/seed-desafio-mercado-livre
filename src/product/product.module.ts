import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploadFile } from 'src/util/uploadfile';

@Module({
  controllers: [ProductController],
  providers: [ProductService, UploadFile],
})
export class ProductModule {}
