import { ICustomer, ICustomerOrder } from '@purple-2023/interfaces';

import { v4 as uuidv4 } from 'uuid';

const generateUUID = async (): Promise<string> => {
  let uid = await uuidv4();
  const searchRegExp = /-/g;
  const replaceWith = '';

  //console.log(`uid befo changin - on empty symbol`);
  //console.log(uid);
  uid = uid.replace(searchRegExp, replaceWith);
  //console.log(`uid after changin - on empty symbol`);
  //console.log(uid);
  return uid;
};

export class CustomerEntity implements ICustomer {
  customerId: string;
  basketId: string;
  orders: ICustomerOrder[];

  //constructor(user: Omit<IUser, 'passwordHash'>) {
  constructor(customer: ICustomer) {
    this.customerId = customer.customerId;
    this.basketId = customer.basketId;
    this.orders = customer.orders;
  }

  public async updateBasketId(): Promise<boolean> {
    let needUpdate = false;
    if (!this.basketId) {
      //console.log('if (!this.basketId) {');
      this.basketId = await generateUUID();
      //console.log(this);
      needUpdate = true;
      return needUpdate;
    }
    // check if such basket id already is in customer.orders.purchaseId
    if (this.orders.length) {
      const foundPurchases = this.orders.filter(
        (order) => order.purchaseId === this.basketId
      );
      if (foundPurchases.length) {
        this.basketId = await generateUUID();
        needUpdate = true;
      }
    }
    //console.log('needUpdate');
    //console.log(needUpdate);
    //console.log(this);
    return needUpdate;
  }
}
