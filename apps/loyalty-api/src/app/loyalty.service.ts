import { Injectable } from '@nestjs/common';
import { LoymaxService } from './loymax/loymax.service';
import {
  ILoyaltyCalculateProductRequest,
  ILoyaltyCoupon,
  ILoyaltyPay,
} from '@purple-2023/interfaces';

@Injectable()
export class LoyaltyService {
  constructor(private readonly loymaxService: LoymaxService) {}

  async balance(customerId: string, cashRegisterId: string) {
    return this.loymaxService.balance(customerId, cashRegisterId);
  }

  async calculate({
    customerId,
    cashRegisterId,
    purchaseId,
    chequeId,
    chequeDate,
    products,
    coupons,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
    chequeId: string;
    chequeDate: string;
    products: ILoyaltyCalculateProductRequest[];
    coupons: ILoyaltyCoupon[];
  }) {
    return this.loymaxService.calculate({
      customerId,
      cashRegisterId,
      purchaseId,
      chequeId,
      chequeDate,
      products,
      coupons,
    });
  }

  async availableBonusAmountForDebiting({
    customerId,
    cashRegisterId,
    purchaseId,
    chequeId,
    chequeDate,
    products,
    coupons,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
    chequeId: string;
    chequeDate: string;
    products: ILoyaltyCalculateProductRequest[];
    coupons: ILoyaltyCoupon[];
  }) {
    return this.loymaxService.availableAmount({
      customerId,
      cashRegisterId,
      purchaseId,
      chequeId,
      chequeDate,
      products,
      coupons,
    });
  }

  async writeOffBonuses({
    customerId,
    cashRegisterId,
    purchaseId,
    chequeId,
    chequeDate,
    products,
    bonusWriteOffAmount,
    coupons,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
    chequeId: string;
    chequeDate: string;
    products: ILoyaltyCalculateProductRequest[];
    bonusWriteOffAmount: number;
    coupons: ILoyaltyCoupon[];
  }) {
    return this.loymaxService.payment({
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

  async discount({
    customerId,
    cashRegisterId,
    purchaseId,
    products,
    chequeId,
    chequeDate,
    pays,
    coupons,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
    chequeId: string;
    chequeDate: string;
    products: ILoyaltyCalculateProductRequest[];
    pays: ILoyaltyPay[];
    coupons: ILoyaltyCoupon[];
  }) {
    return this.loymaxService.discount(
      customerId,
      cashRegisterId,
      purchaseId,
      chequeId,
      chequeDate,
      products,
      pays,
      coupons
    );
  }

  async confirmPurchase({
    customerId,
    cashRegisterId,
    purchaseId,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
  }) {
    return this.loymaxService.confirmPurchase(
      customerId,
      cashRegisterId,
      purchaseId
    );
  }

  async cancelPurchase({
    cashRegisterId,
    purchaseId,
  }: {
    customerId?: string;
    cashRegisterId: string;
    purchaseId: string;
  }) {
    return this.loymaxService.cancelPurchase(cashRegisterId, purchaseId);
  }
}
