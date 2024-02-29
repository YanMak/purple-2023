import { NotFoundException } from '@nestjs/common';
import { ILoymaxXMLResponceErrorCode } from '../../interfaces/errors.interface';

export function confirmPurchaseErrorHandler(
  error: ILoymaxXMLResponceErrorCode
) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '216') {
    throw new NotFoundException(error);
  }
}
