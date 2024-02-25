export interface ICustomerBalanceRequest {
  customerId: string;
}

export interface ICustomerBalanceResponse {
  bonusAmount: string;
  customerName: string;
  cardNumber: string;
}

export interface ILoyaltyCalculateProductRequest {
  positionId: number;
  productId: string;
  quantity: number;
  price: number;
  amount: number;
  name: string;
}

export interface ILoyaltyCalculateProductResult {
  positionId: number;
  productId: string;
  quantity: number;
  price?: number;
  amount: number;
  cashback: number;
  discount: number;
}

export interface ILoyaltyDiscountProductRequest {
  positionId: number;
  productId: string;
  quantity: number;
  price: number;
  amount: number;
  name: string;
}

export interface ILoyaltyDiscountProductResult {
  positionId: number;
  productId: string;
  quantity: number;
  price?: number;
  amount: number;
  cashback: number;
  discount: number;
}

export enum ILoyaltyPayType {
  Gift1C = 'Gift1C',
  Card = 'Card',
  Cash = 'Cash',
  Loymax = 'Loymax',
}

export interface ILoyaltyPay {
  type: ILoyaltyPayType;
  amount: number;
}
