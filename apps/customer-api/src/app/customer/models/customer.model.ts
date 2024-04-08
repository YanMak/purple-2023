import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICustomer, ICustomerOrderMetadata } from '@purple-2023/interfaces';
import { Document, Types } from 'mongoose';

@Schema()
export class CustomerOrder extends Document implements ICustomerOrderMetadata {
  @Prop()
  orderStatus: string;

  @Prop()
  orderId: string;

  @Prop()
  purchaseId: string;

  @Prop()
  chequeId: string;

  @Prop()
  chequeDate: string;

  @Prop()
  online: boolean;
}

export const CustomerOrderSchema = SchemaFactory.createForClass(CustomerOrder);

@Schema()
export class Customer extends Document implements ICustomer {
  @Prop()
  customerId: string;

  @Prop()
  basketId: string;

  @Prop()
  chequeId: string;

  @Prop()
  chequeDate: string;

  @Prop({ type: [CustomerOrderSchema], _id: false })
  orders: Types.Array<CustomerOrder>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
