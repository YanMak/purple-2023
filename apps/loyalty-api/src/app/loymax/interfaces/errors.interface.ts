/*export const LoymaxBalanceXMLResponceErrorCodeNoError = '0';
export const LoymaxBalanceXMLResponceErrorCodeNotFound = '201';
export const ILoymaxBalanceXMLResponceErrorCodeErrorCode =
  | LoymaxBalanceXMLResponceErrorCodeNotFound
  | LoymaxBalanceXMLResponceErrorCodeNoError;
*/

export interface ILoymaxXMLResponceErrorCode {
  ErrorCode: string;
  ErrorMessage: string;
  DeviceLogicalID: string;
  OperationID: string;
  BonusAmount: string;
}
