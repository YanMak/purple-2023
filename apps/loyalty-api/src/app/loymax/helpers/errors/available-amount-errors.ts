import { ForbiddenException } from '@nestjs/common';
import { ILoymaxXMLResponseErrorCode } from '../../interfaces/errors.interface';

export function availableAmmountErrorHandler(
  error: ILoymaxXMLResponseErrorCode
) {
  if (error.ErrorCode === '0') {
    return error;
  }
  if (error.ErrorCode === '218' || error.ErrorCode === '221') {
    throw new ForbiddenException(error);
  }
}
