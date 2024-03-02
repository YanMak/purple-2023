import { NotFoundException } from '@nestjs/common';
import { ILoymaxXMLResponseErrorCode } from '../../interfaces/errors.interface';

export function confirmPurchaseErrorHandler(
  error: ILoymaxXMLResponseErrorCode
) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '216') {
    throw new NotFoundException(error);
  }
}
