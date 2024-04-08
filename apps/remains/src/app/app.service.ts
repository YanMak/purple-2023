import { HttpService } from '@nestjs/axios';
import { Injectable, Post } from '@nestjs/common';
import {
  IDeliveryPoint,
  IDeliveryPointProfile,
  IWarehouseRemains,
} from '@purple-2023/interfaces';
import { AxiosResponse } from 'axios';
import { DeliveryPointRepository } from './repositories/delivery-point.repository';
import { DeliveryPointEntity } from './entities/delivery-point.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly pointRepository: DeliveryPointRepository
  ) {}

  ////////////////////////
  // POINT PROFILES {
  public async createUpdatePoints(dtos: IDeliveryPointProfile[]) {
    dtos.map((dto) => this.createUpdatePoint(dto));
  }

  public async createUpdatePoint(dto: IDeliveryPointProfile) {
    return this.pointRepository.createUpdateProfile(dto);
  }
  // } POINT PROFILES
  //////////////////////////

  ////////////////////////
  // POINT REMAINS {
  public async reloadRemains(id: string, remains: IWarehouseRemains[]) {
    try {
      const res = await this.pointRepository.setRemains(id, remains);
      console.log(`succesfully save remains ` + id);
      return res;
    } catch (e) {
      console.log(`cant save remains ` + id);
      return undefined;
    }
  }

  public async updateRemains(id: string, newRemains: IWarehouseRemains[]) {
    return this.pointRepository.updateRemains(id, newRemains);
  }

  public async getRemainsByFilter() {
    return this.pointRepository.getRemainsByFilter();
  }

  // } POINT REMAINS
  //////////////////////////

  /*
  public async ping(): Promise<{ message: string }> {
    return { message: 'Hello API' };
  }

  ////////////////////////
  // POINT PROFILES {
  public async getPointsProfiles() {
    return (await this.pointRepository.find({})).map(point => {
      point.remains = [];
      return point;
    });
  }

  public async getWarehousesProfilesFromERP(): Promise<IRetailerWarehouse_ERP[]> {
    this.httpService.axiosRef.defaults.headers['Authorization'] = 'Basic ZXhjaF91c2VyX3dhcmVob3VzZTpFeGNoX3VzZXJfd2FyZWhvdXNlNTQ1'
    //config.auth.username = 'exch_user_warehouse';
    //config.auth.username = 'Exch_user_warehouse545';

    const { data } = await this.httpService.axiosRef.get<unknown, AxiosResponse<IRetailerWarehouse_ERP[]>>('http://corp.incity.ru:88/OnlineStore/hs/ecom_api_trade/v1/get_stores_v1?count=1');
    //console.log(data)
    return data
    //const 
  }

  public async createUpdateWarehouseProfile(point: IRetailerWarehouse_ERP) {
    const newPoint: IDeliveryPoint = {
      ...point
      , deliveryAvailable: point.im_orders,
      hasRemains: true,
      remainsReserveAvailable: point.pick_in_store,
      workSchedule: '',
      deliveryService: { id: 'retail', title: 'retail' },
      remains: [],
      warehouse: point,
      isOnlineStore: 
    }
    const newPointEntity = new DeliveryPointEntity(newPoint);
    const existedPoint = await this.pointRepository.findOne(newPointEntity.id);
    if (!existedPoint) {
      return await this.pointRepository.create(newPointEntity);
    } else {
      // update
      this.updatePointProfile(newPointEntity);
      return existedPoint
    }
  }

  public updatePointProfile(point: DeliveryPointEntity) {
    const newProfile: IDeliveryPointProfile = {
      address: point.address,
      deliveryAvailable: point.deliveryAvailable,
      deliveryService: point.deliveryService,
      hasRemains: point.hasRemains,
      title: point.title,
      workSchedule: point.workSchedule,
      remainsReserveAvailable: point.remainsReserveAvailable,
      warehouse: point.warehouse,
      isOnlineStore: point.isOnlineStore
    }
    this.pointRepository.updateProfile(point.id, newProfile)
  }

  public async createUpdateWarehousesProfiles(data: IRetailerWarehouse_ERP[]) {
    data.map(point => {
      return this.createUpdateWarehouseProfile(point)
    })
  }

  public async getWarehousesProfiles() {
    const profiles = await this.pointRepository.find({ hasRemains: true })
    return profiles
  }

  // } POINT PROFILES
  //////////////////////////


  ////////////////////////
  // POINT REMAINS {
  public async refreshPointsRemains() {
    //const id = '802811c4-0c12-11df-9772-005056b263b2'
    const warehousesProfiles = await this.getWarehousesProfiles();
    warehousesProfiles.map(point => {
      console.log(point.title + ' ' + point.warehouse.outerURL);
      this.refreshPointRemains(point.id)
    });
  }

  public async refreshPointRemains(id: string) {
    //console.log('ublic async refreshPointRemains(id: string) {')
    const connectionUrl = await this.pointRepository.findConnectionUrl(id);

    if (!connectionUrl) { return }
    //console.log(connectionUrl)
    try {
      const pointRemainsERP = await this.getWarehouseRemainsFromERP(connectionUrl);
      const pointRemains = pointRemainsERP.map(remain => ({ barcode: remain.Штрихкод, count: remain.КоличествоОстаток }))
      //console.log(pointRemains)
      const res = await this.pointRepository.setRemains(id, pointRemains);
      console.log(`succesfully get remains ` + connectionUrl);
      return res
    }
    catch (e) {
      console.log(`cant get remains ` + connectionUrl);
      return undefined
    }

  }

  //public async refreshPointsRemains()

  public async updatePointRemains(id: string, newRemains: IWarehouseRemains[]) {
    return this.pointRepository.updateRemains(id, newRemains)
  }

  public async getPointRemains(id: string) {
    return this.pointRepository.getRemains(id);
  }

  public async getWarehouseRemainsFromERP(outerUrl: string): Promise<IWarehouseRemains_ERP_V1[]> {
    //public async getWarehouseRemainsFromERP(outerUrl: string): Promise<void> {
    const { data } = await this.httpService.axiosRef.get<unknown, AxiosResponse<IWarehouseRemains_ERP_V1[]>>(outerUrl);
    //console.log('public async getWarehouseRemainsFromERP(outerUrl: string):');
    //const res = await this.httpService.axiosRef.get<unknown, AxiosResponse<IWarehouseRemains_ERP_V1[]>>('http://185.193.140.110:80/11129_1/hs/Remains/get_remains');
    //console.log('res:');
    //console.log(res);
    //const { data } = await this.httpService.axiosRef.get<unknown, AxiosResponse<IWarehouseRemains_ERP_V1[]>>('185.193.140.110:80/11129_1/hs/Remains/get_remains');
    //console.log(data)
    return data
  }

*/
}
