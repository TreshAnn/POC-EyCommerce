import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomErrorService {
  createError(code: number, message: string) {
    const errCode = code;
    const errMessage = message || 'Something went wrong!';

    return {
      status: errCode,
      message: errMessage,
    };
  }
}
