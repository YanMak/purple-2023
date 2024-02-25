import { Controller, Get, Param } from '@nestjs/common';

import { CustomerService } from './customer/customer.service';

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
