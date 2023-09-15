import {
  registerDecorator,
  ValidationOptions,
  isPhoneNumber as isPhoneNumberValidator,
} from 'class-validator';

function hasLeadingTrailingSpacesValidator(value: any): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  const trimmedValue = value.trim();
  return trimmedValue === value;
}

export function addressHasLeadingTrailingSpaces(): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'addressHasLeadingTrailingSpaces',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any): boolean {
          return hasLeadingTrailingSpacesValidator(value);
        },
        defaultMessage(): string {
          return `${propertyName} must not have leading or trailing spaces.`;
        },
      },
    });
  };
}

export function isPhoneNumberWithTrim(
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberWithTrim',
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      validator: {
        validate(value: any): boolean {
          if (typeof value !== 'string') {
            return false;
          }
          const trimmedValue = value.trim();
          return (
            isPhoneNumberValidator(trimmedValue, undefined) &&
            trimmedValue === value
          );
        },
        defaultMessage(): string {
          return 'Invalid phone number format. Phone number must not have leading or trailing spaces and should be a valid phone number.';
        },
      },
    });
  };
}

export function isValidRating(options?: ValidationOptions): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidRating',
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      validator: {
        validate(value: any): boolean {
          return typeof value === 'number' && value >= 1 && value <= 5;
        },
        defaultMessage(): string {
          return 'Rating must be a number between 1 and 5.';
        },
      },
    });
  };
}
