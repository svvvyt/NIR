import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any) {
    const object = plainToInstance(value.constructor, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors
        .map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
        )
        .join(', ');
      throw new BadRequestException(`Validation failed: ${messages}`);
    }
    return value;
  }
}
