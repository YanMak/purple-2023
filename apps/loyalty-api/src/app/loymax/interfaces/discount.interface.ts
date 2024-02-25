export interface ILoymaxDiscountProductRequest {
  positionId: number;
  productId: string;
  quantity: number;
  price: number;
  amount: number;
  name: string;
}

export interface ILoymaxDiscountProductResult {
  positionId: number;
  productId: string;
  quantity: number;
  price?: number;
  amount: number;
  cashback: number;
  discount: number;
}
