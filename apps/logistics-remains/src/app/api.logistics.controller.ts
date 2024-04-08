import { Controller, Get, Query } from '@nestjs/common';

import { LogisticsRemains_ApiLogisticsService } from './api.logistics.service';
import {
  ILogisticsRemains_findNearestWarehouseDto,
  ILogisticsRemains_findWarehouseWithinAreaDto,
} from './interfaces/find.warehouse.dto';

@Controller()
export class LogisticsRemains_ApiLogisticsController {
  constructor(
    private readonly apiService: LogisticsRemains_ApiLogisticsService
  ) {}

  @Get('ping')
  ping() {
    return this.apiService.ping();
  }

  @Get('load_pickup_points')
  createUpdateAllPickupPoints() {
    this.apiService.createUpdateAllPickupPoints();
  }

  @Get('find_nearest_points_v2')
  async findNearestPoints_v2(
    @Query() query: ILogisticsRemains_findNearestWarehouseDto
  ) {
    return this.apiService.near(query.lng, query.lat);
  }

  @Get('find_nearest_points')
  async findNearestPoints(
    @Query() query: ILogisticsRemains_findNearestWarehouseDto
  ) {
    return this.apiService.near(query.lng, query.lat);
  }

  @Get('find_within_box')
  async findPointsWithinBox(
    @Query() query: ILogisticsRemains_findWarehouseWithinAreaDto
  ) {
    return this.apiService.findPointsWithinBox(
      [query.lngBL, query.latBL],
      [query.lngTR, query.latTR]
    );
  }

  @Get('dadata_point_info')
  async getDadataPointInfo() {
    return this.apiService.getPointInfo([
      '115193, Россия, г. Москва, ул. 7-ая Кожуховская, 9',
    ]);
  }

  @Get('fill_empty_lng_lat')
  async fillEmptyLngLat() {
    return this.apiService.fillEmptyLngLat();
  }

  @Get('all_points')
  async getAllPoints() {
    return this.apiService.getAllPoints();
  }
}
