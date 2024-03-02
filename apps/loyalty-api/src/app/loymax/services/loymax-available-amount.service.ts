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
import { getCashRegisterData } from '../helpers/cash-register';
import { getApiUrl } from '../helpers/loymax-api-url';
import { availableAmountRequestChequeLines } from '../helpers/available-amount-conversions';
import { ILoymaxAvailableAmountProductRequest } from '../interfaces/available-amount.interface';
import { availableAmmountErrorHandler } from '../helpers/errors/available-amount-errors';
//import { couponsLines } from '../helpers/coupon-conversion';

@Injectable()
export class LoymaxAvailableAmountService {
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

  /*
  <XMLRequest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<Version>3.2</Version>
	<AvailableAmounts>
		<AvailableAmountRequest ElementID="1" OperationID="e62164a51b3d4fa2a760050b877b0ec6" OperationDate="2024-02-29T14:09:23+03:00" DeviceLogicalID="inc22722" PurchaseID="4a09fa86860441b08af4bf76fc6351f9" Cashier="Администратор077">
			<Cheque ChequeNumber="29022024134716" ChequeDate="2024-02-29T13:47:16">
				<ChequeLine PosID="1" Amount="3999" Name="Юбка джинсовая жен.: Некондиция -50%" Quantity="1" GoodsId="2029010365396" Price="3999"/>
				<ChequeLine PosID="2" Amount="1999" Name="Куртка утепленная жен.: (171563)алый,XS(42)/170" Quantity="1" GoodsId="2029010023241" Price="1999"/>
			</Cheque>
			<Identifier Type="Auto" Value="79269167763"/>
		</AvailableAmountRequest>
	</AvailableAmounts>
</XMLRequest>*/

  async getAvailableAmountRequestXML({
    customerId,
    cashRegisterId,
    products,
    purchaseId,
    chequeId,
    chequeDate,
    coupons,
  }: {
    customerId: string;
    cashRegisterId: string;
    products: ILoymaxAvailableAmountProductRequest[];
    purchaseId?: string;
    chequeId?: string;
    chequeDate?: string;
    coupons;
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

    console.log(coupons);

    return builder.buildObject({
      XMLRequest: {
        $: {
          'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        },
        Version: LOYMAX_API_VERSION,
        AvailableAmounts: {
          AvailableAmountRequest: {
            $: {
              ElementID: '1',
              OperationID: operationID,
              OperationDate: lastmod,
              DeviceLogicalID: cashRegisterId,
              PurchaseID: purchaseId,
              Cashier: 'Администратор077',
            },
            Cheque: {
              $: { ChequeNumber: chequeId, ChequeDate: chequeDateString },
              ChequeLine: availableAmountRequestChequeLines(products),
            },
            /*Coupons': The element 'AvailableAmountRequest' has invalid child element 'Coupons'. List of possible elements expected: 'Identifier, Card, Params'. (line 11, pos 8)
            Coupons: {
              Coupon: couponsLines(coupons),
            },
            */
            Identifier: {
              $: { Type: 'Auto', Value: customerId },
            },
          },
        },
      },
    });
  }

  async sendAvailableAmountRequestQuery(
    bodyXML: string,
    cashRegisterId: string
  ) {
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

  async parseAvailableAmountResponseXML(bodyXML: string) {
    const parser = new Parser();

    const result = await parser.parseStringPromise(bodyXML);

    const errorCode =
      result['XMLResponse']['AvailableAmounts'][0][
        'AvailableAmountResponse'
      ][0]['$'];
    /*const errorHandler = calculateErrorHandler(errorCode);
    if (errorHandler.statusCode !== 200 && errorHandler.statusCode !== 201) {
      return errorHandler;
    }*/
    availableAmmountErrorHandler(errorCode);

    const availableAmountResponse =
      result['XMLResponse']['AvailableAmounts'][0]['AvailableAmountResponse'];
    const availableBonusAmount = parseInt(
      availableAmountResponse[0]['$']['BonusAmount']
    );
    const availableAmount = parseInt(availableAmountResponse[0]['$']['Amount']);

    /*
    const Cheque =
      result['XMLResponse']['AvailableAmounts'][0][
        'AvailableAmountResponse'
      ][0]['Cheque'];

    console.log(Cheque);

    const productsResponse: ILoymaxAvailableAmountProductResult[] = [];
    Cheque[0].ChequeLine.map((item) => {
      productsResponse.push({
        positionId: parseInt(item['$'].PosID),
        productId: item['$'].GoodsId,
        quantity: parseFloat(item['$'].Quantity),
        amount: parseFloat(item['$'].Amount),
        cashback: parseFloat(item['$'].Cashback),
        discount: parseFloat(item['$'].Discount),
        availableBonusPay: item['$'].PayAmount
          ? parseFloat(item['$'].PayAmount)
          : 0,
      });
    });
    console.log(productsResponse);
*/

    return {
      availableBonusAmount,
      availableAmount,
    };
  }
}
