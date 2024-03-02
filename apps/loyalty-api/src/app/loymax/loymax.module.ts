import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoymaxService } from './loymax.service';
import { LoymaxBalanceService } from './services/loymax-balance.service';
import { LoymaxCalculateService } from './services/loymax-calculate.service';
import { LoymaxDiscountService } from './services/loymax-discount.service';
import { LoymaxConfirmPurchaseService } from './services/loymax-confirm-purchase.service';
import { LoymaxAvailableAmountService } from './services/loymax-available-amount.service';
import { LoymaxCancelPurchaseService } from './services/cancel-purchase.service';
import { LoymaxPaymentService } from './services/loymax-payment.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.loyalty.env' }),
  ],
  providers: [
    LoymaxService,
    LoymaxBalanceService,
    LoymaxCalculateService,
    LoymaxAvailableAmountService,
    LoymaxDiscountService,
    LoymaxConfirmPurchaseService,
    LoymaxCancelPurchaseService,
    LoymaxPaymentService,
  ],
  exports: [LoymaxService],
})
export class LoymaxModule {}
