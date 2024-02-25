import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Builder, Parser } from 'xml2js';
import { LOYMAX_API_VERSION } from '../loymax.constants';
import { generateOperationId } from '../../helpers/generate-operation-id';
import { getDateForXML } from '../helpers/date-for-xml';
import { ILoymaxCashRegister } from '../interfaces/cash-register.interface';
import { getCashRegisterData } from '../helpers/cash-register';
import { getApiUrl } from '../helpers/loymax-api-url';

@Injectable()
export class LoymaxBalanceService {
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

  async getBalanceRequestXML(customerId: string, cashRegisterId: string) {
    const operationID = await generateOperationId();
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
        Balances: {
          BalanceRequest: {
            $: {
              ElementID: '1',
              OperationID: operationID,
              OperationDate: lastmod,
              DeviceLogicalID: cashRegisterId,
            },
            Identifier: {
              $: { Type: 'Auto', Value: customerId },
            },
          },
        },
      },
    });
  }

  async sendBalanceQuery(bodyXML: string, cashRegisterId: string) {
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

  async parseBalanceResponceXML(bodyXML: string) {
    const parser = new Parser();
    /*parser.parseString(bodyXML, function (err, result) {
      //Extract the value from the data element
      extractedData = result['XMLResponse']['Balances'];
      console.log(JSON.stringify(extractedData));
    });*/

    const result = await parser.parseStringPromise(bodyXML);
    const balanceResponse =
      result['XMLResponse']['Balances'][0]['BalanceResponse'];

    //console.log(JSON.stringify(result.XMLResponse.Balances[0].BalanceResponse));
    const bonusAmount = parseInt(balanceResponse[0]['$']['BonusAmount']);
    const IdentifierData =
      result['XMLResponse']['Balances'][0]['BalanceResponse'][0][
        'IdentifierData'
      ];
    let customerName: string = '';
    let cardNumber: string = '';
    IdentifierData[0].Item.map((item) => {
      if (item['$'].Name === 'Person') {
        customerName = item['_'];
      }
      if (item['$'].Name === 'Cardnumber') {
        cardNumber = item['_'];
      }
    });
    //IdentifierData[0].Item.map((item) => console.log(item['_']));

    //console.log(IdentifierData[0]);
    //console.log(result.XMLResponse.Balances[0].BalanceResponse[0]['$']);

    return { bonusAmount, customerName, cardNumber };
  }
}
