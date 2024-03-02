/*export const LoymaxBalanceXMLResponseErrorCodeNoError = '0';
export const LoymaxBalanceXMLResponseErrorCodeNotFound = '201';
export const ILoymaxBalanceXMLResponseErrorCodeErrorCode =
  | LoymaxBalanceXMLResponseErrorCodeNotFound
  | LoymaxBalanceXMLResponseErrorCodeNoError;
*/

export interface ILoymaxXMLResponseErrorCode {
  ErrorCode: string;
  ErrorMessage: string;
  DeviceLogicalID: string;
  OperationID: string;
  BonusAmount: string;
}
