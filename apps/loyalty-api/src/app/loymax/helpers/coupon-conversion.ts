import { ILoymaxCoupon } from '../interfaces/coupon.interface';

export const couponsLines = (products: ILoymaxCoupon[]) => {
  const res = products.map((coupon) => ({
    $: {
      Number: coupon.couponName,
    },
  }));
  return res;
};

/*
export const discountResponseChequeLines = () => {
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
};
*/
