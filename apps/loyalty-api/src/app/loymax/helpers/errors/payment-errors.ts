import { ForbiddenException } from '@nestjs/common';
import { ILoymaxXMLResponseErrorCode } from '../../interfaces/errors.interface';

export function paymentErrorHandler(error: ILoymaxXMLResponseErrorCode) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '207' || error.ErrorCode === '217') {
    throw new ForbiddenException(error);
  }
}
