import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoymaxService } from './loymax.service';
import { LoymaxBalanceService } from './services/loymax-balance.service';
import { LoymaxCalculateService } from './services/loymax-calculate.service';
import { LoymaxDiscountService } from './services/loymax-discount.service';
import { LoymaxConfirmPurchaseService } from './services/loymax-confirm-purchase.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.loyalty.env' }),
  ],
  providers: [
    LoymaxService,
    LoymaxBalanceService,
    LoymaxCalculateService,
    LoymaxDiscountService,
    LoymaxConfirmPurchaseService,
  ],
  exports: [LoymaxService],
})
export class LoymaxModule {}
