import { NotFoundException } from '@nestjs/common';
import { ILoymaxXMLResponceErrorCode } from '../../interfaces/errors.interface';

export function balanceErrorHandler(error: ILoymaxXMLResponceErrorCode) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '201') {
    throw new NotFoundException(error);
  }
}
