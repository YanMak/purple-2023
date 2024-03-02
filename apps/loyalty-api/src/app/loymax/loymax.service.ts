import { Injectable } from '@nestjs/common';
import { LoymaxBalanceService } from './services/loymax-balance.service';
import { LoymaxCalculateService } from './services/loymax-calculate.service';
import { LoymaxDiscountService } from './services/loymax-discount.service';
import { ILoymaxCalculateProductRequest } from './interfaces/calculate.interface';
import { ILoymaxDiscountProductRequest } from './interfaces/discount.interface';
import { ILoymaxPay } from './interfaces/pay.interface';
import { LoymaxConfirmPurchaseService } from './services/loymax-confirm-purchase.service';
import { LoymaxAvailableAmountService } from './services/loymax-available-amount.service';
import { LoymaxCancelPurchaseService } from './services/cancel-purchase.service';
import { LoymaxPaymentService } from './services/loymax-payment.service';
import { ILoymaxCoupon } from './interfaces/coupon.interface';

@Injectable()
export class LoymaxService {
  constructor(
    private readonly loymaxBalanceService: LoymaxBalanceService,
    private readonly loymaxCalculateService: LoymaxCalculateService,
    private readonly loymaxAvailableAmountService: LoymaxAvailableAmountService,
    private readonly loymaxDiscountService: LoymaxDiscountService,
    private readonly loymaxConfirmPurchaseService: LoymaxConfirmPurchaseService,
    private readonly loymaxCancelPurchaseService: LoymaxCancelPurchaseService,
    private readonly loymaxPaymentService: LoymaxPaymentService
  ) {}

  async balance(customerId: string, cashRegisterId: string) {
    const requestPayload = await this.loymaxBalanceService.getBalanceRequestXML(
      customerId,
      cashRegisterId
    );

    const data = await this.loymaxBalanceService.sendBalanceQuery(
      requestPayload,
      cashRegisterId
    );

    const parsed = await this.loymaxBalanceService.parseBalanceResponseXML(
      data
    );
    console.log(parsed);
    return parsed;
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
    products: ILoymaxCalculateProductRequest[];
    coupons: ILoymaxCoupon[];
  }) {
    const requestPayload =
      await this.loymaxCalculateService.getCalculateRequestXML({
        customerId,
        cashRegisterId,
        products,
        purchaseId,
        chequeId,
        chequeDate,
        coupons,
      });
    console.log(requestPayload);

    const data = await this.loymaxCalculateService.sendCalculateQuery(
      requestPayload,
      cashRegisterId
    );

    const parsed = await this.loymaxCalculateService.parseCalculateResponseXML(
      data
    );
    console.log(parsed);
    return parsed;
  }

  async availableAmount({
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
    products: ILoymaxCalculateProductRequest[];
    coupons: ILoymaxCoupon[];
  }) {
    const requestPayload =
      await this.loymaxAvailableAmountService.getAvailableAmountRequestXML({
        customerId,
        cashRegisterId,
        products,
        purchaseId,
        chequeId,
        chequeDate,
        coupons,
      });
    console.log(requestPayload);

    const data =
      await this.loymaxAvailableAmountService.sendAvailableAmountRequestQuery(
        requestPayload,
        cashRegisterId
      );

    const parsed =
      await this.loymaxAvailableAmountService.parseAvailableAmountResponseXML(
        data
      );
    console.log(parsed);
    return parsed;
  }

  async payment({
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
    products: ILoymaxCalculateProductRequest[];
    bonusWriteOffAmount: number;
    coupons: ILoymaxCoupon[];
  }) {
    //console.log(`!!!!!!! this is async payment({ !!!!!!!!`);
    const requestPayload = await this.loymaxPaymentService.getPaymentRequestXML(
      {
        customerId,
        cashRegisterId,
        products,
        purchaseId,
        chequeId,
        chequeDate,
        bonusWriteOffAmount,
        coupons,
      }
    );

    console.log(requestPayload);

    //return true;

    const data = await this.loymaxPaymentService.sendPaymentRequestQuery(
      requestPayload,
      cashRegisterId
    );

    const parsed = await this.loymaxPaymentService.parsePaymentResponseXML(
      data
    );
    console.log(parsed);
    return parsed;
  }

  async discount(
    customerId: string,
    cashRegisterId: string,
    purchaseId: string,
    chequeId: string,
    chequeDate: string,
    products: ILoymaxDiscountProductRequest[],
    pays: ILoymaxPay[],
    coupons: ILoymaxCoupon[]
  ) {
    const requestPayload =
      await this.loymaxDiscountService.getDiscountRequestXML({
        customerId,
        cashRegisterId,
        purchaseId,
        chequeId,
        chequeDate,
        products,
        pays,
        coupons,
      });
    console.log(requestPayload);

    const data = await this.loymaxCalculateService.sendCalculateQuery(
      requestPayload,
      cashRegisterId
    );

    const parsed = await this.loymaxDiscountService.parseDiscountResponseXML(
      data
    );
    console.log(parsed);
    return parsed;

    //console.log(data);
    //return { xmlResult: data };

    /*
	  const parsed = await this.loymaxDiscountService.parseBalanceResponseXML(
		data
	  );
	  console.log(parsed);
	  return parsed;
	}*/
  }

  async confirmPurchase(
    customerId: string,
    cashRegisterId: string,
    purchaseId: string
  ) {
    const requestPayload =
      await this.loymaxConfirmPurchaseService.getConfirmPurchaseRequestXMLPayload(
        customerId,
        cashRegisterId,
        purchaseId
      );

    const data =
      await this.loymaxConfirmPurchaseService.sendConfirmPurchaseQuery(
        requestPayload,
        cashRegisterId
      );
    console.log(data);

    const parsed =
      await this.loymaxConfirmPurchaseService.parseConfirmPurchaseResponseXML(
        data
      );
    console.log(parsed);
    return parsed;
    //return { xmlResult: data };
    /*const parsed = await this.loymaxBalanceService.parseBalanceResponseXMLPayload(
      data
    );
    console.log(parsed);
    return parsed;*/
  }

  async cancelPurchase(cashRegisterId: string, purchaseId: string) {
    const requestPayload =
      await this.loymaxCancelPurchaseService.getCancelPurchaseRequestXML({
        cashRegisterId,
        purchaseId,
      });

    const data = await this.loymaxCancelPurchaseService.sendCancelPurchaseQuery(
      requestPayload,
      cashRegisterId
    );
    console.log(data);

    const parsed =
      await this.loymaxCancelPurchaseService.parseCancelResponseXML(data);
    console.log(parsed);
    return parsed;
    //return { xmlResult: data };
    /*const parsed = await this.loymaxBalanceService.parseBalanceResponseXMLPayload(
      data
    );
    console.log(parsed);
    return parsed;*/
  }
}
