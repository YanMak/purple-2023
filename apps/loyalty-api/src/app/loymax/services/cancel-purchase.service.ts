import { Injectable } from '@nestjs/common';
import { ILoymaxCashRegister } from '../interfaces/cash-register.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LOYMAX_API_VERSION } from '../loymax.constants';
import { generatePurchaseId } from '../../helpers/generate-purchase-id';
import { generateOperationId } from '../../helpers/generate-operation-id';
import { Builder, Parser } from 'xml2js';
import { getDateForXML } from '../helpers/date-for-xml';
import { getCashRegisterData } from '../helpers/cash-register';
import { getApiUrl } from '../helpers/loymax-api-url';
import { cancelPurchaseErrorHandler } from '../helpers/errors/cancel-purchase-errors';

@Injectable()
export class LoymaxCancelPurchaseService {
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

  async getCancelPurchaseRequestXML({
    cashRegisterId,
    purchaseId,
  }: {
    cashRegisterId: string;
    purchaseId?: string;
  }) {
    const operationID = await generateOperationId(); // always newly generated
    if (!purchaseId) {
      purchaseId = await generatePurchaseId();
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
        CancelPurchases: {
          CancelPurchaseRequest: {
            $: {
              ElementID: '1',
              OperationID: operationID,
              OperationDate: lastmod,
              DeviceLogicalID: cashRegisterId,
              PurchaseID: purchaseId,
              Cashier: 'Администратор077',
            },
          },
        },
      },
    });
  }

  async sendCancelPurchaseQuery(bodyXML: string, cashRegisterId: string) {
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

  async parseCancelResponseXML(bodyXML: string) {
    const parser = new Parser();

    const result = await parser.parseStringPromise(bodyXML);

    const errorCode =
      result['XMLResponse']['CancelPurchases'][0]['CancelPurchaseRequest'][0][
        '$'
      ];
    /*const errorHandler = calculateErrorHandler(errorCode);
    if (errorHandler.statusCode !== 200 && errorHandler.statusCode !== 201) {
      return errorHandler;
    }*/
    return cancelPurchaseErrorHandler(errorCode);
  }
}
