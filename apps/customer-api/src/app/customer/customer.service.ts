import { Injectable } from '@nestjs/common';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';
import { ICustomerOrder } from '@purple-2023/interfaces';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository //private readonly customerEventEmitter: UserEventEmitter //private readonly rmqService: RMQService,
  ) {}

  async findCustomer(customerId: string) {
    return this.customerRepository.findCustomer(customerId);
  }

  async customerOrders(
    customerId: string
  ): Promise<{ orders: ICustomerOrder[] }> {
    const customer = await this.customerRepository.findCustomer(customerId);
    return { orders: customer.orders };
  }

  async basketId(customerId: string) {
    let existedCustomer = await this.customerRepository.findCustomer(
      customerId
    );
    //console.log('existedCustomer');
    //console.log(existedCustomer);
    if (!existedCustomer) {
      // create new
      const newCustomerEntitity = new CustomerEntity({
        customerId,
        basketId: '',
        orders: [],
      });
      //console.log(`newCustomerEntitity`);
      //console.log(newCustomerEntitity);
      await newCustomerEntitity.updateBasketId();
      //console.log(`newCustomerEntitity after updateBasketId`);
      //console.log(newCustomerEntitity);
      existedCustomer = await this.customerRepository.createCustomer(
        newCustomerEntitity
      );
      //console.log(`saved Customer`);
      //console.log(existedCustomer);
      return existedCustomer.basketId;
    }

    const customerEntitity = new CustomerEntity(existedCustomer);
    const needUpdate = await customerEntitity.updateBasketId();
    //console.log(
    //  `const needUpdate = customerEntitity.updateBasketId(); ${JSON.stringify(
    //    customerEntitity
    //  )}`
    //);
    if (needUpdate) {
      //console.log(
      //  `if (needUpdate) {, result of customerRepository.updateBasketId({`
      //);
      //console.log(
      //  `if (needUpdate) { customerEntitity.basketId: ${customerEntitity.basketId}`
      //);
      const res = await this.customerRepository.updateBasketId({
        customerId,
        basketId: customerEntitity.basketId,
      });
      //console.log(`const res = await this.customerRepository.updateBasketId({`);
      //console.log(res);
    }
    //console.log(`customerEntitity.basketId: ${customerEntitity.basketId}`);
    return customerEntitity.basketId;
  }

  /*
	async updateCustomerV1({customerId, basketId }: Pick<ICustomer, 'customerId, basketId'> ) {
		//console.log('_____________________');
		//console.log('async register({ email, password, displayName }: AccountRegister.Request) {')
		//console.log(`email ${email}, password ${password}, displayName ${displayName}}`)
		const existedCustomer = await this.customerRepository.findCustomer(customerId);
		console.log('existedCustomer');
		console.log(existedCustomer);
		if (!existedCustomer) {
			console.log('throw new Error(customer not found);');
			throw new Error('customer not found');
		}

		const userEntity = await new CustomerEntity(existedCustomer);
		//console.log('userEntity');
		//console.log(userEntity);

		const updatedUserEntity = userEntity.updateCustomerV1(basketId);
		await this.updateCustomer(updatedUserEntity);
		return { user: { ...updatedUserEntity } };
		//return { email: updatedUser.email, displayName: updatedUser.displayName };
	}

	async delete(email: string) {
		return this.customerRepository.delete(email);
	}

	async updateCustomer(customer: CustomerEntity) {
		//return this.userRepository.updateUser(user)
		//console.log(`async updateUser(user: UserEntity) {`);
		//console.log(user.courses);

		return Promise.all([
			this.customerRepository.updateCustomer(customer),
			//this.customerEventEmitter.handle(user),
		]);
	}*/
}
