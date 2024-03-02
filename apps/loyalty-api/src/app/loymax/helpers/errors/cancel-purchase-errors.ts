import { ForbiddenException } from '@nestjs/common';
import { ILoymaxXMLResponseErrorCode } from '../../interfaces/errors.interface';

export function cancelPurchaseErrorHandler(error: ILoymaxXMLResponseErrorCode) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '218') {
    throw new ForbiddenException(error);
  }
}
