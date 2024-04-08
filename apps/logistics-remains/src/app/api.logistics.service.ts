import { Injectable } from '@nestjs/common';
import { LogisticsRemains_WarehouseRepository } from './repositories/warehouse.repository';
import { ApishipService } from './_partners-api/apiship/apiship.service';
import { IncityService2 } from './_partners-api/incity/incity.service2';
import { DadataService } from './_partners-api/dadata/dadata.service';
import { ILogisticsRemains_Warehouse } from '@purple-2023/interfaces';
import { LogisticsRemains_WarehouseEntity } from './entities/warehouse.entity';

@Injectable()
export class LogisticsRemains_ApiLogisticsService {
  constructor(
    private readonly pointsRepository: LogisticsRemains_WarehouseRepository,
    private readonly apishipService: ApishipService,
    private readonly incityService2: IncityService2,
    private readonly dadataService: DadataService
  ) {}

  ping(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUpdateAllPickupPoints() {
    const apishipPoints = await this.apishipService.listsPoints();
    this.createUpdatePoints(apishipPoints);

    const incityOnlineStorePoints =
      await this.incityService2.incityOnlineStorePoints();
    this.createUpdatePoints(incityOnlineStorePoints);

    const incityRetailPoints = await this.incityService2.incityRetailPoints();
    //LogisticsApi_pickupPointRepository
    console.log('incityPoints______________');
    console.log(incityRetailPoints);
    this.createUpdatePoints(incityRetailPoints);
  }

  ////////////////////////
  // POINT PROFILES {
  public async createUpdatePoints(dtos: ILogisticsRemains_Warehouse[]) {
    dtos.map((dto) => this.createUpdatePoint(dto));
  }

  public async createUpdatePoint(dto: ILogisticsRemains_Warehouse) {
    const entity = new LogisticsRemains_WarehouseEntity(dto);
    return this.pointsRepository.createUpdateProfile(entity);
  }
  // } POINT PROFILES
  //////////////////////////

  public async getAllPoints() {
    return await this.pointsRepository.getAllPoints();
  }

  public async near(lng: number, lat: number) {
    return await this.pointsRepository.near(lng, lat);
  }

  public async findPointsWithinBox(
    [lngBL, latBL]: [lngBL: number, latBL: number],
    [lngTR, latTR]: [lngTR: number, latTR: number]
  ) {
    return await this.pointsRepository.findPointsWithinBox(
      [lngBL, latBL],
      [lngTR, latTR]
    );
  }

  public async getPointInfo(adresses: string[]) {
    return await this.dadataService.v1_clean_address(adresses);
  }

  public async fillPointLngLat(point: LogisticsRemains_WarehouseEntity) {
    if (point.loc[0] === 0) {
      const [dadata] = await this.dadataService.v1_clean_address([
        point.address,
      ]);
      this.createUpdatePoint({
        loc: [Number(dadata.geo_lon), Number(dadata.geo_lat)],
        title: point.title,
        id: point.id,
        providerKey: point.providerKey,
        address: point.address,
        remains: [],
      });
    }
  }
  public async fillEmptyLngLat() {
    const points = await this.pointsRepository.findEmptyLonLat();

    //console.log(points);
    //console.log('points[0]:');
    //console.log(points[0]);
    //this.fillPointLngLat(points[0]);

    //return points;
    //this.fillPointLngLat(points[0]);

    points.map((point) => this.fillPointLngLat(point));
    return points;
  }
}
