import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';
import {
  ILogisticsApi_findNearestPickupPointQueryDto,
  ILogisticsApi_findPickupPointsWithinAreaQueryDto,
} from './interfaces/find.pickup-point.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  ping() {
    return this.appService.ping();
  }

  @Get('load_pickup_points')
  createUpdateAllPickupPoints() {
    this.appService.createUpdateAllPickupPoints();
  }

  @Get('find_nearest_points_v2')
  async findNearestPoints_v2(
    @Query() query: ILogisticsApi_findNearestPickupPointQueryDto
  ) {
    return this.appService.near(query.lng, query.lat);
  }

  @Get('find_nearest_points')
  async findNearestPoints(
    @Query() query: ILogisticsApi_findNearestPickupPointQueryDto
  ) {
    return this.appService.near(query.lng, query.lat);
  }

  @Get('find_within_box')
  async findPointsWithinBox(
    @Query() query: ILogisticsApi_findPickupPointsWithinAreaQueryDto
  ) {
    return this.appService.findPointsWithinBox(
      [query.lngBL, query.latBL],
      [query.lngTR, query.latTR]
    );
  }

  @Get('dadata_point_info')
  async getDadataPointInfo() {
    return this.appService.getPointInfo([
      '115193, Россия, г. Москва, ул. 7-ая Кожуховская, 9',
    ]);
  }

  @Get('fill_empty_lng_lat')
  async fillEmptyLngLat() {
    return this.appService.fillEmptyLngLat();
  }

  @Get('all_points')
  async getAllPoints() {
    return this.appService.getAllPoints();
  }
}
