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
import { calculateRequestChequeLines } from '../helpers/calculate-conversions';
import {
  ILoymaxCalculateProductRequest,
  ILoymaxCalculateProductResult,
} from '../interfaces/calculate.interface';
import { getCashRegisterData } from '../helpers/cash-register';
import { getApiUrl } from '../helpers/loymax-api-url';

@Injectable()
export class LoymaxCalculateService {
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

  async getCalculateRequestXML({
    customerId,
    cashRegisterId,
    products,
    purchaseId,
    chequeNumber,
    chequeDate,
  }: {
    customerId: string;
    cashRegisterId: string;
    products: ILoymaxCalculateProductRequest[];
    purchaseId?: string;
    chequeNumber?: string;
    chequeDate?: Date;
  }) {
    const operationID = await generateOperationId(); // always newly generated
    if (!purchaseId) {
      purchaseId = await generatePurchaseId();
    }
    if (!chequeNumber) {
      chequeNumber = await generateChequeId();
    }
    let chequeDateString = '';
    if (!chequeDate) {
      chequeDateString = getDateForXML(new Date());
    } else {
      chequeDateString = getDateForXML(chequeDate);
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
        Calculates: {
          CalculateRequest: {
            $: {
              ElementID: '1',
              OperationID: operationID,
              OperationDate: lastmod,
              DeviceLogicalID: cashRegisterId,
              PurchaseID: purchaseId,
              Cashier: 'Арзуманова Алекс',
            },
            Identifier: {
              $: { Type: 'Auto', Value: customerId },
            },
            Cheque: {
              $: { ChequeNumber: chequeNumber, ChequeDate: chequeDateString },
              ChequeLine: calculateRequestChequeLines(products),
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
              Coupon: { $: { Number: 'KURTKA20' } },
            },
            Params: {
              Param: [
                { $: { Name: 'Eco', Type: 'string', Value: 'No' } },
                { $: { Name: 'SaleType', Type: 'string', Value: 'offline' } },
                { $: { Name: 'NoSale', Type: 'string', Value: 'No' } },
              ],
            },
          },
        },
      },
    });
  }

  async sendCalculateQuery(bodyXML: string, cashRegisterId: string) {
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

  async parseCalculateResponceXML(bodyXML: string) {
    const parser = new Parser();

    const result = await parser.parseStringPromise(bodyXML);

    const calculateResponse =
      result['XMLResponse']['Calculates'][0]['CalculateResponse'];
    const balance = parseInt(calculateResponse[0]['$']['Balance']);
    const availableBonusAmount = parseInt(
      calculateResponse[0]['$']['AvailableBonusAmount']
    );
    const availableAmount = parseInt(
      calculateResponse[0]['$']['AvailableAmount']
    );

    const Cheque =
      result['XMLResponse']['Calculates'][0]['CalculateResponse'][0]['Cheque'];

    console.log(Cheque);

    const productsResponse: ILoymaxCalculateProductResult[] = [];
    Cheque[0].ChequeLine.map((item) => {
      productsResponse.push({
        positionId: parseInt(item['$'].PosID),
        productId: item['$'].GoodsId,
        quantity: parseFloat(item['$'].Quantity),
        amount: parseFloat(item['$'].Amount),
        cashback: parseFloat(item['$'].Cashback),
        discount: parseFloat(item['$'].Discount),
      });
    });
    console.log(productsResponse);

    return {
      balance,
      availableBonusAmount,
      availableAmount,
      products: productsResponse,
    };
  }
}
