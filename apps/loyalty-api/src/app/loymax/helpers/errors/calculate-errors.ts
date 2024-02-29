import { ForbiddenException } from '@nestjs/common';
import { ILoymaxXMLResponceErrorCode } from '../../interfaces/errors.interface';

export function calculateErrorHandler(error: ILoymaxXMLResponceErrorCode) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '218') {
    throw new ForbiddenException(error);
  }
}
