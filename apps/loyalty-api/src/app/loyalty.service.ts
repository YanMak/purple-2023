import { Injectable } from '@nestjs/common';
import { LoymaxService } from './loymax/loymax.service';
import {
  ILoyaltyCalculateProductRequest,
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
    products,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
    products: ILoyaltyCalculateProductRequest[];
  }) {
    return this.loymaxService.calculate({
      customerId,
      cashRegisterId,
      purchaseId,
      chequeNumber: purchaseId,
      chequeDate: new Date(),
      products,
    });
  }

  async discount({
    customerId,
    cashRegisterId,
    purchaseId,
    products,
    pays,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
    products: ILoyaltyCalculateProductRequest[];
    pays: ILoyaltyPay[];
  }) {
    return this.loymaxService.discount(
      customerId,
      cashRegisterId,
      purchaseId,
      purchaseId,
      new Date(),
      products,
      pays
    );
  }

  async confirmPurchase(
    customerId: string,
    cashRegisterId: string,
    purchaseId: string
  ) {
    return this.loymaxService.confirmPurchase(
      customerId,
      cashRegisterId,
      purchaseId
    );
  }
}
