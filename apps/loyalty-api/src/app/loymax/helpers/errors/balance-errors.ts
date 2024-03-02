import { NotFoundException } from '@nestjs/common';
import { ILoymaxXMLResponseErrorCode } from '../../interfaces/errors.interface';

export function balanceErrorHandler(error: ILoymaxXMLResponseErrorCode) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '201') {
    throw new NotFoundException(error);
  }
}
