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

import { UserService } from '../user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  async validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.userService.findOne(email);
    if (user) return false;
    return true;
  }
}

export function IsEmailAlreadyExist(validateOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validateOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
