import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isPhoneNumber as isPhoneNumberValidator,
} from 'class-validator';

function hasLeadingTrailingSpacesValidator(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  const trimmedValue = value.trim();
  return trimmedValue === value;
}

export function addressHasLeadingTrailingSpaces(): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'addressHasLeadingTrailingSpaces',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: unknown): boolean {
          return hasLeadingTrailingSpacesValidator(value);
        },
        defaultMessage(): string {
          return `${propertyName} must not have leading or trailing spaces.`;
        },
      },
    });
  };
}

export function IsPhoneNumberWithMaxDigits(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberWithMaxDigits',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          if (typeof value !== 'string') {
            return false;
          }
          return /^(\+\d{7,15}|\d{7,15})$/.test(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `Invalid phone number format for ${args.property}. Phone number must be a valid number (e.g., +1234567890 or 1234567890).`;
        },
      },
    });
  };
}
export function isValidRating(options?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidRating',
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      validator: {
        validate(value: unknown): boolean {
          return typeof value === 'number' && value >= 1 && value <= 5;
        },
        defaultMessage(): string {
          return 'Rating must be a number between 1 and 5.';
        },
      },
    });
  };
}

export function isValidRatingTitle(
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidRatingTitle',
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      validator: {
        validate(value: any): boolean {
          if (typeof value !== 'string') {
            return false; // Rating title must be a string
          }
          return value.trim() !== ''; // Check if the trimmed value is not empty
        },
        defaultMessage(): string {
          return `Rating Title should not be empty. `;
        },
      },
    });
  };
}

export function isValidRatingDescription(
  options?: ValidationOptions,
): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidRatingTitle',
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      validator: {
        validate(value: any): boolean {
          if (typeof value !== 'string') {
            return false; // Rating title must be a string
          }
          return value.trim() !== ''; // Check if the trimmed value is not empty
        },
        defaultMessage(): string {
          return `Rating description should not be empty.`;
        },
      },
    });
  };
}
