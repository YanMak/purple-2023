import { ICustomer, ICustomerOrderMetadata } from '@purple-2023/interfaces';

import { v4 as uuidv4 } from 'uuid';
import { getDateForXML } from '../helpers/date-for-xml';

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
  orders: ICustomerOrderMetadata[];
  chequeId: string;
  chequeDate: string;

  //constructor(user: Omit<IUser, 'passwordHash'>) {
  constructor(customer: ICustomer) {
    this.customerId = customer.customerId;
    this.basketId = customer.basketId;
    this.orders = customer.orders;
    this.chequeId = customer.chequeId;
    this.chequeDate = customer.chequeDate;
  }

  private async setNewBasketIds() {
    this.basketId = await generateUUID();

    //13-03-2023 also fill
    this.chequeId = await generateUUID();
    this.chequeDate = getDateForXML(new Date());
  }

  public async updateBasketId(): Promise<boolean> {
    let needUpdate = false;
    if (!this.basketId) {
      //console.log('if (!this.basketId) {');
      await this.setNewBasketIds();

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
        //this.basketId = await generateUUID();
        await this.setNewBasketIds();
        needUpdate = true;
      }
    }
    //console.log('needUpdate');
    //console.log(needUpdate);
    //console.log(this);
    return needUpdate;
  }

  public async updateOrder(newOrder: ICustomerOrderMetadata) {
    const { orderId } = newOrder;
    console.log(this);
    const foundOrder = this.orders.filter((order) => order.orderId === orderId);
    if (!foundOrder.length) {
      this.orders.push(newOrder);
      console.log(this);
      return;
    }
    console.log(this.orders);

    Object.keys(newOrder).map((key) => {
      // Check if obj has key, otherwise use default option
      if (key === 'orderId') {
        return;
      } else if (newOrder[key]) {
        foundOrder[0][key] = newOrder[key];
      }
    });
  }
}
