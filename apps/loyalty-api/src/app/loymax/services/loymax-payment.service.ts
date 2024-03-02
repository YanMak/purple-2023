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
import { calculateErrorHandler } from '../helpers/errors/calculate-errors';
import {
  ILoymaxPaymentProductRequest,
  ILoymaxPaymentProductResult,
} from '../interfaces/payment.interface';
import { paymentRequestChequeLines } from '../helpers/payment-conversion';
import { couponsLines } from '../helpers/coupon-conversion';
import { ILoymaxCoupon } from '../interfaces/coupon.interface';

@Injectable()
export class LoymaxPaymentService {
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
	<Payments>
		<PaymentRequest ElementID="1" OperationID="5a15b03cc03b4e54a4c314b9044728cc" OperationDate="2024-02-29T22:37:45+03:00" DeviceLogicalID="inc22722" PurchaseID="4a09fa86860441b08af4bf76fc6351f9" Cashier="Администратор077" Amount="100">
			<Cheque ChequeNumber="29022024134716" ChequeDate="2024-02-29T13:47:16">
				<ChequeLine PosID="1" Amount="3999" Name="Юбка джинсовая жен.: Некондиция -50%" GoodsId="2029010365396" Price="3999" Quantity="1"/>
				<ChequeLine PosID="2" Amount="1999" Name="Куртка утепленная жен.: (171563)алый,XS(42)/170" GoodsId="2029010023241" Price="1999" Quantity="1"/>
				<ChequeLine PosID="3" Amount="2398.5" Name="Блузка жен.: (000000)кипенно-белый,XS(42)/170" GoodsId="2029009959681" Price="1599" Quantity="2"/>
			</Cheque>
			<Identifier Type="Auto" Value="79269167763"/>
			<Coupons>
				<Coupon Number="KURTKA20"/>
			</Coupons>
		</PaymentRequest>
	</Payments>
</XMLRequest>*/

  async getPaymentRequestXML({
    customerId,
    cashRegisterId,
    products,
    purchaseId,
    chequeId,
    chequeDate,
    bonusWriteOffAmount,
    coupons,
  }: {
    customerId: string;
    cashRegisterId: string;
    products: ILoymaxPaymentProductRequest[];
    purchaseId?: string;
    chequeId?: string;
    chequeDate?: string;
    bonusWriteOffAmount: number;
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
        Payments: {
          PaymentRequest: {
            $: {
              ElementID: '1',
              OperationID: operationID,
              OperationDate: lastmod,
              DeviceLogicalID: cashRegisterId,
              PurchaseID: purchaseId,
              Cashier: 'Администратор077',
              Amount: '' + bonusWriteOffAmount,
            },
            Cheque: {
              $: { ChequeNumber: chequeId, ChequeDate: chequeDateString },
              ChequeLine: paymentRequestChequeLines(products),
            },
            Identifier: {
              $: { Type: 'Auto', Value: customerId },
            },
            Coupons: {
              Coupon: couponsLines(coupons),
            },
            /*Coupons: {
              Coupon: { $: { Number: 'KURTKA20' } },
            }*/
          },
        },
      },
    });
  }

  async sendPaymentRequestQuery(bodyXML: string, cashRegisterId: string) {
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

  /*
  <?xml version="1.0" encoding="utf-8"?>
  <XMLResponse><Version>3.2</Version><ErrorCode>0</ErrorCode>
  <Payments>
  <PaymentResponse ErrorCode="0" DeviceLogicalID="inc22722" OperationID="e65ab819f9d2464ba4d8b121b31e7bc2" TransactionID="6361874" AuthCode="405415" Amount="100.00" BonusAmount="100.00">
  <IdentifierData><Item Name="Person">Ян Макошанец</Item><Item Name="MaskedNumber">**** **** **** 8638</Item><Item Name="CardType">BonusCard</Item><Item Name="Status">Activated</Item><Item Name="Cardnumber">9200111728638</Item></IdentifierData>
  <ChequeMessage>Списано: 100 бонусов!</ChequeMessage>
  <Cheque><ChequeLine PosID="1" Amount="2398.50" Discount="799.50" Quantity="2.000" PayAmount="0.00" GoodsId="2029009959681"><AppliedOffers><Offer Id="20" VersionId="2887" Name="Оплата бонусами в размере до 30% от суммы чека" ExternalId="433ffb2f-8c39-4a49-a034-8b7bce927958" Quantity="2" PrerefenceValue="0.00" CurrencyAbbreviation="бнс." />
  </AppliedOffers>
  </ChequeLine><ChequeLine PosID="2" Amount="3999.00" Discount="0.00" Quantity="1.000" PayAmount="100.00" GoodsId="2029010365396">
  <AppliedOffers><Offer Id="20" VersionId="2887" Name="Оплата бонусами в размере до 30% от суммы чека" ExternalId="433ffb2f-8c39-4a49-a034-8b7bce927958" Quantity="1" PrerefenceValue="100.00" CurrencyAbbreviation="бнс." />
  </AppliedOffers></ChequeLine><ChequeLine PosID="3" Amount="1999.00" Discount="0.00" Quantity="1.000" PayAmount="0.00" GoodsId="2029010023241"><AppliedOffers><Offer Id="20" VersionId="2887" Name="Оплата бонусами в размере до 30% от суммы чека" ExternalId="433ffb2f-8c39-4a49-a034-8b7bce927958" Quantity="1" PrerefenceValue="0.00" CurrencyAbbreviation="бнс." /></AppliedOffers></ChequeLine></Cheque><LoyaltyPrograms><LoyaltyProgram Name="Default" /></LoyaltyPrograms></PaymentResponse></Payments></XMLResponse>
  */
  async parsePaymentResponseXML(bodyXML: string) {
    const parser = new Parser();

    const result = await parser.parseStringPromise(bodyXML);

    const errorCode =
      result['XMLResponse']['Payments'][0]['PaymentResponse'][0]['$'];
    /*const errorHandler = calculateErrorHandler(errorCode);
    if (errorHandler.statusCode !== 200 && errorHandler.statusCode !== 201) {
      return errorHandler;
    }*/
    calculateErrorHandler(errorCode);

    const availableAmountResponse =
      result['XMLResponse']['Payments'][0]['PaymentResponse'];
    const availableBonusAmount = parseInt(
      availableAmountResponse[0]['$']['BonusAmount']
    );
    const availableAmount = parseInt(availableAmountResponse[0]['$']['Amount']);

    const Cheque =
      result['XMLResponse']['Payments'][0]['PaymentResponse'][0]['Cheque'];

    console.log(Cheque);

    const productsResponse: ILoymaxPaymentProductResult[] = [];
    Cheque[0].ChequeLine.map((item) => {
      productsResponse.push({
        positionId: parseInt(item['$'].PosID),
        productId: item['$'].GoodsId,
        quantity: parseFloat(item['$'].Quantity),
        amount: parseFloat(item['$'].Amount),
        cashback: parseFloat(item['$'].Cashback),
        discount: parseFloat(item['$'].Discount),
        bonusPay: item['$'].PayAmount ? parseFloat(item['$'].PayAmount) : 0,
      });
    });
    console.log(productsResponse);

    return {
      availableBonusAmount,
      availableAmount,
      products: productsResponse,
    };
  }
}
