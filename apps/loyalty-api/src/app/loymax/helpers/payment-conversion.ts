import { ILoymaxCalculateProductRequest } from '../interfaces/calculate.interface';

export const paymentRequestChequeLines = (
  products: ILoymaxCalculateProductRequest[]
) => {
  const res = products.map((product) => ({
    $: {
      PosID: product.positionId,
      Amount: '' + product.amount,
      Name: product.name,
      Quantity: '' + product.quantity,
      GoodsId: product.productId,
      Price: product.price,
    },
  }));
  return res;
};
