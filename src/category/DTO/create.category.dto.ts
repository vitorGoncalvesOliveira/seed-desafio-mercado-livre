import { IsNotEmpty } from 'class-validator';
import { IsCategoryExist } from '../IsCategoryExist.constraint';
export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsCategoryExist({ message: 'Category already exist' })
  name: string;

  motherCategory: string;
}
