export interface ILoymaxAvailableAmountProductRequest {
  positionId: number;
  productId: string;
  quantity: number;
  price: number;
  amount: number;
  name: string;
}

export interface ILoymaxAvailableAmountProductResult {
  positionId: number;
  productId: string;
  quantity: number;
  price?: number;
  amount: number;
  cashback: number;
  discount: number;
  availableBonusPay?: number;
}
