import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import {
  ILoyaltyCalculateProductRequest,
  ILoyaltyDiscountProductRequest,
  ILoyaltyPay,
} from '@purple-2023/interfaces';

@Controller('loyalty')
export class LoyaltyController {
  domain: string;

  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get('balance/:cash_register_id/:client_id')
  @Header('content-type', 'text/xml')
  async getBalance(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    return this.loyaltyService.balance(customerId, cashRegisterId);
  }

  @Post('calculate/:cash_register_id/:client_id/:purchase_id')
  @Header('content-type', 'text/xml')
  async calculate(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Param('purchase_id') purchaseId: string,
    @Body() products: ILoyaltyCalculateProductRequest[]
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    return this.loyaltyService.calculate({
      customerId,
      cashRegisterId,
      purchaseId,
      products,
    });
  }

  @Post('discount/:cash_register_id/:client_id/:purchase_id')
  @Header('content-type', 'text/xml')
  async discount(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Param('purchase_id') purchaseId: string,
    @Body()
    {
      products,
      pays,
    }: { products: ILoyaltyDiscountProductRequest[]; pays: ILoyaltyPay[] }
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    return this.loyaltyService.discount({
      customerId,
      cashRegisterId,
      purchaseId,
      products,
      pays,
    });
  }

  @Post('confirm-purchase/:cash_register_id/:client_id/:purchase_id')
  @Header('content-type', 'text/xml')
  async confirmPurchase(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Param('purchase_id') purchaseId: string
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    return this.loyaltyService.confirmPurchase(
      customerId,
      cashRegisterId,
      purchaseId
    );
  }
}
