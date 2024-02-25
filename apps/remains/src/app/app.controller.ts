import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { IDeliveryPointProfile, IWarehouseRemains } from '@purple-2023/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('create-update-points')
  async createUpdatePoints(@Body() dtos: IDeliveryPointProfile[]) {
    //console.log('async createUpdatePoints(dtos: IDeliveryPointProfile[]) {');
    //console.log(dtos);
    return this.appService.createUpdatePoints(dtos);
  }

  @Post('reload-remains')
  async reloadRemains(@Body() { id, remains }: { id: string, remains: IWarehouseRemains[] }) {
    return this.appService.reloadRemains(id, remains)
  }

  @Post('update-remains')
  async updateRemains(@Body() { id, remains }: { id: string, remains: IWarehouseRemains[] }) {
    return this.appService.updateRemains(id, remains)
  }

  @Post('get-remains-by-filter')
  async getRemainsByFilter() {
    // @Body() { city, product_ids, pointIds }
    // most common cases: 
    // user opens site/app with city set by default
    // user sees catalogue cards only available in his city
    //    for fast agregation it can be built on view model 
    //    - after remains update request service makes notification for data base View
    //    , so we will translate remains from View table, not from points table

    // at first step we only use product_ids filter
    return this.appService.getRemainsByFilter();

  }

  /*
  @Get('ping')
  getData() {
    return this.appService.ping();
  }

  // Connection to ERP {
  @Get('warehouses-profiles-from-erp')
  async getWarehousesProfilesFromERP() {
    return this.appService.getWarehousesProfilesFromERP();
  }

  @Get('warehouses-remains-from-erp')
  async getWarehousesRemainsFromERP() {
    return this.appService.getWarehouseRemainsFromERP('http://185.193.140.110:80/11129_1/hs/Remains/get_remains');
  }

  @Post('warehouses-refresh-remains-from-erp')
  async refreshWarehousesRemainsFromERP() {
    //const id = '802811c4-0c12-11df-9772-005056b263b2'
    //return await this.appService.refreshPointRemains(id);
    await this.appService.refreshPointsRemains();
  }
  // } Connection to ERP

  @Post('warehouse-update-remains')
  async updateWarehouseRemains() {
    const id = '802811c4-0c12-11df-9772-005056b263b2';
    // { "id" : "802811c4-0c12-11df-9772-005056b263b2"  }
    //const newRemains: IWarehouseRemains[] = [{ barcode: '2029000330458', count: 0 }, { barcode: '2029000320312', count: 0 }]
    const newRemains: IWarehouseRemains[] = [{ barcode: '2029000330458', count: 777 }, { barcode: '2029000320312', count: 777 }]
    return await this.appService.updatePointRemains(id, newRemains);
  }

  @Post('warehouse-get-remains')
  async getWarehouseRemains() {
    const id = '802811c4-0c12-11df-9772-005056b263b2';
    // { "id" : "802811c4-0c12-11df-9772-005056b263b2"  }
    //const newRemains: IWarehouseRemains[] = [{ barcode: '2029000330458', count: 0 }, { barcode: '2029000320312', count: 0 }]
    //const newRemains: IWarehouseRemains[] = [{ barcode: '2029000330458', count: 777 }, { barcode: '2029000320312', count: 777 }]
    return await this.appService.getPointRemains(id);
  }

  @Post('warehouses-profiles')
  async createUpdateWarehousesProfiles() {
    const warehousesProfilesData = await this.appService.getWarehousesProfilesFromERP()
    return this.appService.createUpdateWarehousesProfiles(warehousesProfilesData);
  }

  @Get('points-profiles')
  async getPointsProfiles() {
    return await this.appService.getPointsProfiles();
  }*/
}
