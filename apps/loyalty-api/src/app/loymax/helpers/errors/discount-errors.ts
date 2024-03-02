import { ForbiddenException } from '@nestjs/common';
import { ILoymaxXMLResponseErrorCode } from '../../interfaces/errors.interface';

export function discountErrorHandler(error: ILoymaxXMLResponseErrorCode) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (
    error.ErrorCode === '217' ||
    error.ErrorCode === '224' ||
    error.ErrorCode === '218'
  ) {
    throw new ForbiddenException(error);
  }
}
