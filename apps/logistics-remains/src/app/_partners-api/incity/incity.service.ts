import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { WarehouseParametersRepository_Partner } from './incity.repository';
import {
  IWarehouseParameters_Partner_Incity,
  IWarehouseRemains_Partner_Incity_V1,
} from './incity.interface';
import { ConfigService } from '@nestjs/config';
import { INCITY_DELIVERY_SERVICE } from './incity.constants';

@Injectable()
export class IncityService {
  constructor(
    private readonly httpService: HttpService,
    private readonly partnerPointRepository: WarehouseParametersRepository_Partner,
    private readonly configService: ConfigService
  ) {}

  public async ping(): Promise<{ message: string }> {
    return { message: 'Hello INCITY API' };
  }

  ////////////////////////
  // POINT PROFILES {
  public async getPartnerPointsProperties() {
    return await this.partnerPointRepository.findAll();
  }

  public async getPartnerWarehousesPropertiesFromERP(): Promise<
    IWarehouseParameters_Partner_Incity[]
  > {
    this.httpService.axiosRef.defaults.headers['Authorization'] =
      'Basic ZXhjaF91c2VyX3dhcmVob3VzZTpFeGNoX3VzZXJfd2FyZWhvdXNlNTQ1';
    //config.auth.username = 'exch_user_warehouse';
    //config.auth.username = 'Exch_user_warehouse545';

    const { data } = await this.httpService.axiosRef.get<
      unknown,
      AxiosResponse<IWarehouseParameters_Partner_Incity[]>
    >(
      'http://corp.incity.ru:88/OnlineStore/hs/ecom_api_trade/v1/get_stores_v1?count=1'
    );
    //console.log(data)
    return data;
    //const
  }

  public async createUpdatePointsProfiles() {
    const erpData = await this.getPartnerWarehousesPropertiesFromERP();
    erpData.map((point) => {
      // erp specified, needed for getting remains etc
      this.createUpdatePartnerWarehouseProfile(point);
      // common
      //this.createUpdateWarehouseProfile(point);
    });
    //console.log('public async createUpdatePartnerWarehousesProfiles() {');
    //console.log(erpData);
    const data = erpData.map((point) => ({
      ...point,
      deliveryAvailable: point.im_orders,
      hasRemains: true,
      remainsReserveAvailable: point.pick_in_store,
      workSchedule: '',
      deliveryService: INCITY_DELIVERY_SERVICE,
      warehouse: point,
      isOnlineStore: false,
      city: point.city,
    }));

    const apiUrl = this.configService.get('API_HOSTNAME');
    const connectUrl =
      'http://' + apiUrl + ':3334/remains/create-update-points';
    //console.log(connectUrl);
    const res = await this.httpService.axiosRef.post(connectUrl, data);
    //console.log(res)
    return res;
  }

  public async createUpdatePartnerWarehouseProfile(
    point: IWarehouseParameters_Partner_Incity
  ) {
    this.partnerPointRepository.createUpdate(point);
  }

  // } POINT PROFILES
  //////////////////////////

  ////////////////////////
  // POINTS REMAINS {
  public async reloadRetailWarehousesRemains() {
    const points = await this.partnerPointRepository.findAll();
    //console.log(points)
    points.map((point) => {
      if (point.outerURL) {
        //console.log(point.title + ' ' + point.outerURL);
        this.reloadRetailWarehouseRemains(point);
      }
    });
  }

  public async reloadRetailWarehouseRemains(
    point: IWarehouseParameters_Partner_Incity
  ) {
    try {
      console.log(
        `trying get remains ` +
          point.title +
          ' ' +
          point.outerURL +
          ' ' +
          'http://' +
          point.outerURL
      );
      const pointRemainsERP = await this.getWarehouseRemainsFromERP(
        'http://' + point.outerURL
      );
      const pointRemains = pointRemainsERP.map((remain) => ({
        id: remain.Штрихкод,
        barcode: remain.Штрихкод,
        count: remain.КоличествоОстаток,
      }));
      //console.log(pointRemains)
      //const res = await this.pointRepository.setRemains(id, pointRemains);
      console.log(
        `succesfully get remains ` +
          point.title +
          ' ' +
          point.outerURL +
          ' ' +
          'http://' +
          point.outerURL
      );
      //return res
      // then try to set remains via app controller
      const apiUrl = this.configService.get('API_HOSTNAME');
      const connectUrl = 'http://' + apiUrl + ':3334/remains/reload-remains';
      //console.log(connectUrl);
      const res = await this.httpService.axiosRef.post(connectUrl, {
        id: point.id,
        remains: pointRemains,
      });
      return res;
    } catch (e) {
      console.log(`cant get remains ` + point.title + ' ' + point.outerURL);
      return undefined;
    }
  }

  public async getWarehouseRemainsFromERP(
    outerUrl: string
  ): Promise<IWarehouseRemains_Partner_Incity_V1[]> {
    //public async getWarehouseRemainsFromERP(outerUrl: string): Promise<void> {
    const { data } = await this.httpService.axiosRef.get<
      unknown,
      AxiosResponse<IWarehouseRemains_Partner_Incity_V1[]>
    >(outerUrl);
    //console.log('public async getWarehouseRemainsFromERP(outerUrl: string):');
    //const res = await this.httpService.axiosRef.get<unknown, AxiosResponse<IWarehouseRemains_ERP_V1[]>>('http://185.193.140.110:80/11129_1/hs/Remains/get_remains');
    //console.log('res:');
    //console.log(res);
    //const { data } = await this.httpService.axiosRef.get<unknown, AxiosResponse<IWarehouseRemains_ERP_V1[]>>('185.193.140.110:80/11129_1/hs/Remains/get_remains');
    //console.log(data)
    return data;
  }

  // } POINTS REMAINS
  //////////////////////////
}
