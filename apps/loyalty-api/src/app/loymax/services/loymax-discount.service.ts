import { Injectable } from '@nestjs/common';
import { ILoymaxCashRegister } from '../interfaces/cash-register.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LOYMAX_API_VERSION } from '../loymax.constants';
import { generatePurchaseId } from '../../helpers/generate-purchase-id';
import { generateChequeId } from '../../helpers/generate-cheque-id';
import { generateOperationId } from '../../helpers/generate-operation-id';
import { Builder, Parser } from 'xml2js';
import { getDateForXML } from '../helpers/date-for-xml';
import { ILoymaxDiscountProductRequest } from '../interfaces/discount.interface';
import { discountRequestChequeLines } from '../helpers/discount-conversions';
import { ILoymaxPay } from '../interfaces/pay.interface';
import { payChequeLines } from '../helpers/pay-conversion';
import { getCashRegisterData } from '../helpers/cash-register';
import { getApiUrl } from '../helpers/loymax-api-url';
import { discountErrorHandler } from '../helpers/errors/discount-errors';
import { couponsLines } from '../helpers/coupon-conversion';
import { ILoymaxCoupon } from '../interfaces/coupon.interface';

@Injectable()
export class LoymaxDiscountService {
  //user: string;
  //password: string;
  url: string;
  cashRegisters: ILoymaxCashRegister[];

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.url = configService.get('LOYMAX_CASHIER_API_URL');
    this.cashRegisters = JSON.parse(configService.get('LOYALTY_CASH_REGISTER'));
    console.log(this.cashRegisters);
  }

  async getDiscountRequestXML({
    customerId,
    cashRegisterId,
    products,
    pays,
    purchaseId,
    chequeId,
    chequeDate,
    coupons,
  }: {
    customerId: string;
    cashRegisterId: string;
    products: ILoymaxDiscountProductRequest[];
    pays: ILoymaxPay[];
    purchaseId?: string;
    chequeId?: string;
    chequeDate?: string;
    coupons: ILoymaxCoupon[];
  }) {
    const operationID = await generateOperationId(); // always newly generated
    if (!purchaseId) {
      purchaseId = await generatePurchaseId();
    }
    if (!chequeId) {
      chequeId = await generateChequeId();
    }
    let chequeDateString = '';
    if (!chequeDate) {
      chequeDateString = getDateForXML(new Date());
    } else {
      //chequeDateString = getDateForXML(chequeDate);
      chequeDateString = chequeDate;
    }
    const lastmod = getDateForXML(new Date());

    const builder = new Builder({
      xmldec: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    });
    return builder.buildObject({
      XMLRequest: {
        $: {
          'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        },
        Version: LOYMAX_API_VERSION,
        Discounts: {
          DiscountRequest: {
            $: {
              ElementID: '1',
              OperationID: operationID,
              OperationDate: lastmod,
              DeviceLogicalID: cashRegisterId,
              PurchaseID: purchaseId,
              Cashier: 'Администратор077',
            },
            Identifier: {
              $: { Type: 'Auto', Value: customerId },
            },
            Cheque: {
              $: { ChequeNumber: chequeId, ChequeDate: chequeDateString },
              ChequeLine: discountRequestChequeLines(products),
              /*[
                {
                  $: {
                    PosID: '1',
                    Amount: '3999',
                    Name: 'Юбка джинсовая жен.: Некондиция -50%',
                    Quantity: '1',
                    GoodsId: '2029010365396',
                    Price: '3999',
                  },
                },
                {
                  $: {
                    PosID: '2',
                    Amount: '1999',
                    Name: 'Куртка утепленная жен.: (171563)алый,XS(42)/170',
                    Quantity: '1',
                    GoodsId: '2029010023241',
                    Price: '1999',
                  },
                },
              ],*/
            },
            Coupons: {
              Coupon: couponsLines(coupons),
            },
            Pays: {
              Pay: payChequeLines(pays),
              /*[
                { $: { Type: 'Gift1C', Amount: '5000' } },
                { $: { Type: 'Card', Amount: '1000' } },
              ],*/
            },
          },
        },
      },
    });
  }

  async sendDiscountQuery(bodyXML: string, cashRegisterId: string) {
    console.log(bodyXML);
    const cashRegister = getCashRegisterData(
      this.cashRegisters,
      cashRegisterId
    );

    this.httpService.axiosRef.defaults.headers['Authorization'] =
      'Basic ' + cashRegister.basicBearer;
    this.httpService.axiosRef.defaults.headers['Content-Type'] =
      'application/xml';

    const connectUrl = getApiUrl(this.url, cashRegister.cashRegisterId);
    const { data } = await this.httpService.axiosRef.post(connectUrl, bodyXML);
    console.log(data);
    console.log('_____________________');
    return data;
  }

  async parseDiscountResponseXML(bodyXML: string) {
    const parser = new Parser();

    const result = await parser.parseStringPromise(bodyXML);

    const errorCode =
      result['XMLResponse']['Discounts'][0]['DiscountResponse'][0]['$'];
    const errorHandler = discountErrorHandler(errorCode);

    return errorHandler;
  }
}
