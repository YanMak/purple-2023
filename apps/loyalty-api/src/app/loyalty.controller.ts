import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import {
  ILoyaltyCalculateProductRequest,
  ILoyaltyCoupon,
  ILoyaltyDiscountProductRequest,
  ILoyaltyOperationMetaInterface,
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

  @Post('calculate/:cash_register_id/:client_id/')
  @Header('content-type', 'text/xml')
  async calculate(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Body()
    {
      operation,
      products,
      coupons,
    }: {
      operation: ILoyaltyOperationMetaInterface;
      products: ILoyaltyCalculateProductRequest[];
      coupons: ILoyaltyCoupon[];
    }
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    const { purchaseId, chequeDate, chequeId } = operation;
    return this.loyaltyService.calculate({
      customerId,
      cashRegisterId,
      purchaseId,
      chequeId,
      chequeDate,
      products,
      coupons,
    });
  }

  @Post('available-bonus-amount-for-debiting/:cash_register_id/:client_id/')
  @Header('content-type', 'text/xml')
  async availableBonusAmountForDebiting(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Body()
    {
      operation,
      products,
      coupons,
    }: {
      operation: ILoyaltyOperationMetaInterface;
      products: ILoyaltyCalculateProductRequest[];
      coupons: ILoyaltyCoupon[];
    }
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    const { purchaseId, chequeDate, chequeId } = operation;
    return this.loyaltyService.availableBonusAmountForDebiting({
      customerId,
      cashRegisterId,
      purchaseId,
      chequeId,
      chequeDate,
      products,
      coupons,
    });
  }

  @Post('write-off-bonuses/:cash_register_id/:client_id/')
  @Header('content-type', 'text/xml')
  async writeOffBonuses(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Body()
    {
      operation,
      products,
      bonusWriteOffAmount,
      coupons,
    }: {
      operation: ILoyaltyOperationMetaInterface;
      products: ILoyaltyCalculateProductRequest[];
      bonusWriteOffAmount: number;
      coupons: ILoyaltyCoupon[];
    }
  ) {
    //console.log(`write-off-bonuses!!!!`);
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    const { purchaseId, chequeDate, chequeId } = operation;
    return this.loyaltyService.writeOffBonuses({
      customerId,
      cashRegisterId,
      purchaseId,
      chequeId,
      chequeDate,
      products,
      bonusWriteOffAmount,
      coupons,
    });
  }

  @Post('discount/:cash_register_id/:client_id/')
  @Header('content-type', 'text/xml')
  async discount(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Body()
    {
      operation,
      products,
      pays,
      coupons,
    }: {
      operation: ILoyaltyOperationMetaInterface;
      products: ILoyaltyDiscountProductRequest[];
      pays: ILoyaltyPay[];
      coupons: ILoyaltyCoupon[];
    }
  ) {
    const { purchaseId, chequeDate, chequeId } = operation;
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    return this.loyaltyService.discount({
      customerId,
      cashRegisterId,
      purchaseId,
      chequeId,
      chequeDate,
      products,
      pays,
      coupons,
    });
  }

  @Post('confirm-purchase/:cash_register_id/:client_id/')
  @Header('content-type', 'text/xml')
  async confirmPurchase(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Body()
    {
      operation,
    }: {
      operation: ILoyaltyOperationMetaInterface;
    }
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    const { purchaseId } = operation;
    return this.loyaltyService.confirmPurchase({
      customerId,
      cashRegisterId,
      purchaseId,
    });
  }

  @Post('cancel-purchase/:cash_register_id/:client_id/')
  @Header('content-type', 'text/xml')
  async cancelPurchase(
    @Param('client_id') customerId: string,
    @Param('cash_register_id') cashRegisterId: string,
    @Body()
    {
      operation,
    }: {
      operation: ILoyaltyOperationMetaInterface;
    }
  ) {
    console.log(`client_id=${customerId} cash_register_id=${cashRegisterId}`);
    const { purchaseId } = operation;
    return this.loyaltyService.cancelPurchase({
      cashRegisterId,
      purchaseId,
    });
  }
}
