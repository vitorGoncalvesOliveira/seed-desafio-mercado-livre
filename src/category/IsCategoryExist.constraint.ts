/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { CategoryService } from './category.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCategoryExistConstraint implements ValidatorConstraintInterface {
  constructor(private categoryService: CategoryService) {}

  async validate(
    name: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.categoryService.findOneByName(name);
    if (user) return false;
    return true;
  }
}

export function IsCategoryExist(validateOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validateOptions,
      constraints: [],
      validator: IsCategoryExistConstraint,
    });
  };
}
