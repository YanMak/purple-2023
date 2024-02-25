import { ILoymaxCalculateProductRequest } from '../interfaces/calculate.interface';

export const calculateRequestChequeLines = (
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

  return [
    {
      $: {
        PosID: '1',
        Amount: '3198',
        Name: 'Блузка жен.: (000000)кипенно-белый,XS(42)/170',
        Quantity: '2',
        GoodsId: '2029009959681',
        Price: '1599',
      },
    },
    {
      $: {
        PosID: '2',
        Amount: '1599',
        Name: 'Блузка жен.: (000000)кипенно-белый,XS(42)/170',
        Quantity: '1',
        GoodsId: '2029009959681',
        Price: '1599',
      },
    },
  ];
};

/*
export const calculateResponseChequeLines = () => {
  return [
    {
      $: {
        PosID: '1',
        Amount: '2398.50',
        Name: 'Блузка жен.: (000000)кипенно-белый,XS(42)/170',
        Quantity: '2',
        GoodsId: '2029009959681',
        Price: '1599',
        Cashback: '359.78',
        Discount: '799.50',
      },
    },
    {
      $: {
        PosID: '2',
        Amount: '1599',
        Name: 'Блузка жен.: (000000)кипенно-белый,XS(42)/170',
        Quantity: '1',
        GoodsId: '2029009959681',
        Price: '1599',
        Cashback: '239.85',
        Discount: '0.00',
      },
    },
  ];
};*/
