export interface ILoymaxCalculateProductRequest {
  positionId: number;
  productId: string;
  quantity: number;
  price: number;
  amount: number;
  name: string;
}

export interface ILoymaxCalculateProductResult {
  positionId: number;
  productId: string;
  quantity: number;
  price?: number;
  amount: number;
  cashback: number;
  discount: number;
}
