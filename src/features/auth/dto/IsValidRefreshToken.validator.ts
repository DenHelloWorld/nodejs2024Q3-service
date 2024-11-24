import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UnauthorizedException } from '@nestjs/common';

@ValidatorConstraint({ async: false })
export class IsRefreshTokenNotEmpty implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new UnauthorizedException('No refresh toke');
    }
    return true;
  }
}

export function IsValidRefreshToken(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRefreshTokenNotEmpty,
    });
  };
}
