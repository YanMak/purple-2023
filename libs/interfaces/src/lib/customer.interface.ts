export interface ICustomer {
  customerId: string;
  basketId: string;
  orders: ICustomerOrder[];
}

export interface ICustomerOrder {
  orderId: string;
  purchaseId: string;
  chequeId: string;
  online: boolean;
}
