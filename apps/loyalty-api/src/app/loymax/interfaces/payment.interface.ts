export interface ILoymaxPaymentProductRequest {
  positionId: number;
  productId: string;
  quantity: number;
  price: number;
  amount: number;
  name: string;
}

export interface ILoymaxPaymentProductResult {
  positionId: number;
  productId: string;
  quantity: number;
  price?: number;
  amount: number;
  cashback: number;
  discount: number;
  bonusPay?: number;
}
