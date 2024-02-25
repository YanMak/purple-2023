import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { Customer, CustomerSchema } from './models/customer.model';
import { CustomerRepository } from './repositories/customer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  providers: [CustomerRepository, CustomerService],
  exports: [CustomerService],
  controllers: [],
})
export class CustomerModule {}
