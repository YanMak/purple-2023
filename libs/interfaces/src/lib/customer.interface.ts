export interface ICustomer {
  customerId: string;
  basketId: string;
  chequeId: string;
  chequeDate: string;
  orders: ICustomerOrderMetadata[];
}

export interface ICustomerOrderMetadata {
  orderId: string;
  purchaseId: string;
  chequeId?: string;
  chequeDate?: string;
  online?: boolean;
  orderStatus: string;
}
