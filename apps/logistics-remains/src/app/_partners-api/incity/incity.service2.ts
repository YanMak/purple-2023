import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { IWarehouseParameters_Partner_Incity } from './incity.interface';
import { ConfigService } from '@nestjs/config';
import { convertIncityPoint } from './helpers/convert-incity-points';
import { ILogisticsApi_createPickupPointDto } from '../../interfaces/create.warehouse.dto';
import { INCITY_ONLINESTORE_POINT } from './incity.constants';

@Injectable()
export class IncityService2 {
  url: string;
  urlLocal: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.url = configService.get('INCITY_ERP_API_URL');
    this.urlLocal = configService.get('INCITY_ERP_API_URL_LOCAL');
  }

  public async incityRetailPoints(): Promise<
    ILogisticsApi_createPickupPointDto[]
  > {
    this.httpService.axiosRef.defaults.headers['Authorization'] =
      'Basic ZXhjaF91c2VyX3dhcmVob3VzZTpFeGNoX3VzZXJfd2FyZWhvdXNlNTQ1';
    //config.auth.username = 'exch_user_warehouse';
    //config.auth.username = 'Exch_user_warehouse545';

    const url = this.urlLocal;
    //const url = this.url;

    console.log(
      'starting loading ' + url + 'ecom_api_trade/v1/get_stores_v1?count=1'
    );
    const { data } = await this.httpService.axiosRef.get<
      unknown,
      AxiosResponse<IWarehouseParameters_Partner_Incity[]>
    >(url + 'ecom_api_trade/v1/get_stores_v1?count=1');
    //console.log(data)
    //return data;
    return data.map((el) => convertIncityPoint(el));
    //const
  }

  public async incityOnlineStorePoints(): Promise<
    ILogisticsApi_createPickupPointDto[]
  > {
    return [INCITY_ONLINESTORE_POINT];
  }
}
