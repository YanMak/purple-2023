import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CustomerService } from './customer/customer.service';
import { ICustomerOrderMetadata } from '@purple-2023/interfaces';

@Controller()
export class AppController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getData() {
    return { hello: true };
  }

  @Get('basket_id/:client_id')
  async getBasketId(@Param('client_id') customerId: string) {
    //console.log(`client_id=${customerId}`);
    return {
      customerId,
      basketId: await this.customerService.basketId(customerId),
    };
  }

  @Post('update-order-metadata/:client_id')
  async updateOrderMetadata(
    @Param('client_id') customerId: string,
    @Body() order: ICustomerOrderMetadata
  ) {
    //console.log(order);
    return this.customerService.updateOrder({ customerId, order });
  }

  /*
  @Post('calculate/:cash_register_id/:client_id')
  @Header('content-type', 'text/xml')
  async calculate(
    @Param('client_id') clientId: string,
    @Param('cash_register_id') cashRegisterId: string
  ) {
    console.log(`client_id=${clientId} cash_register_id=${cashRegisterId}`);
    return this.loyaltyService.calculate(clientId, cashRegisterId);
  }*/
}
