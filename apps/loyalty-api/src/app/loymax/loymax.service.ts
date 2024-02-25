import { Injectable } from '@nestjs/common';
import { LoymaxBalanceService } from './services/loymax-balance.service';
import { LoymaxCalculateService } from './services/loymax-calculate.service';
import { LoymaxDiscountService } from './services/loymax-discount.service';
import { ILoymaxCalculateProductRequest } from './interfaces/calculate.interface';
import { ILoymaxDiscountProductRequest } from './interfaces/discount.interface';
import { ILoymaxPay } from './interfaces/pay.interface';
import { LoymaxConfirmPurchaseService } from './services/loymax-confirm-purchase.service';

@Injectable()
export class LoymaxService {
  constructor(
    private readonly loymaxBalanceService: LoymaxBalanceService,
    private readonly loymaxCalculateService: LoymaxCalculateService,
    private readonly loymaxDiscountService: LoymaxDiscountService,
    private readonly loymaxConfirmPurchaseService: LoymaxConfirmPurchaseService
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

    const parsed = await this.loymaxBalanceService.parseBalanceResponceXML(
      data
    );
    console.log(parsed);
    return parsed;
  }

  async calculate({
    customerId,
    cashRegisterId,
    purchaseId,
    chequeNumber,
    chequeDate,
    products,
  }: {
    customerId: string;
    cashRegisterId: string;
    purchaseId: string;
    chequeNumber: string;
    chequeDate: Date;
    products: ILoymaxCalculateProductRequest[];
  }) {
    const requestPayload =
      await this.loymaxCalculateService.getCalculateRequestXML({
        customerId,
        cashRegisterId,
        products,
        purchaseId,
        chequeNumber,
        chequeDate,
      });
    console.log(requestPayload);

    const data = await this.loymaxCalculateService.sendCalculateQuery(
      requestPayload,
      cashRegisterId
    );

    const parsed = await this.loymaxCalculateService.parseCalculateResponceXML(
      data
    );
    console.log(parsed);
    return parsed;
  }

  async discount(
    customerId: string,
    cashRegisterId: string,
    purchaseId: string,
    chequeNumber: string,
    chequeDate: Date,
    products: ILoymaxDiscountProductRequest[],
    pays: ILoymaxPay[]
  ) {
    const requestPayload =
      await this.loymaxDiscountService.getDiscountRequestXML({
        customerId,
        cashRegisterId,
        purchaseId,
        chequeNumber,
        chequeDate,
        products,
        pays,
      });
    console.log(requestPayload);

    const data = await this.loymaxCalculateService.sendCalculateQuery(
      requestPayload,
      cashRegisterId
    );
    console.log(data);
    return { xmlResult: data };
    /*
	  const parsed = await this.loymaxDiscountService.parseBalanceResponceXML(
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

    return { xmlResult: data };
    /*const parsed = await this.loymaxBalanceService.parseBalanceResponceXMLPayload(
      data
    );
    console.log(parsed);
    return parsed;*/
  }
}
