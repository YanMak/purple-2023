import { ForbiddenException } from '@nestjs/common';
import { ILoymaxXMLResponceErrorCode } from '../../interfaces/errors.interface';

export function discountErrorHandler(error: ILoymaxXMLResponceErrorCode) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '217') {
    throw new ForbiddenException(error);
  }
}
