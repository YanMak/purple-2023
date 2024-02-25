import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../models/customer.model';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>
  ) {}

  async createCustomer(customer: CustomerEntity) {
    //console.log(`async createCustomer(customer: CustomerEntity) {`);
    //console.log(`customer: CustomerEntity)`);
    //console.log(customer);
    const newCustomer = new this.customerModel(customer);
    //console.log(`newCustomer`);
    //console.log(newCustomer);
    return await newCustomer.save();
  }

  async findCustomer(customerId: string) {
    return this.customerModel.findOne({ customerId }).exec();
  }

  async delete(customerId: string) {
    return this.customerModel.deleteOne({ customerId }).exec();
  }

  async updateCustomer(customer: CustomerEntity) {
    const { customerId, ...customerRest } = customer;
    return this.customerModel.updateOne({ customerId }, customerRest).exec();
  }

  async updateBasketId({
    customerId,
    basketId,
  }: Pick<CustomerEntity, 'basketId' | 'customerId'>) {
    //console.log(
    //  `CustomerRepository async updateBasketId({ customerId=${customerId} basketId=${basketId}`
    //);
    return await this.customerModel
      .updateOne({ customerId }, { $set: { basketId } })
      .exec();
  }
}
