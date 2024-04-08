import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

import { IWarehouseRemains } from '@purple-2023/interfaces';
import { IncityService } from './incity.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Controller('incity')
export class IncityController {
  constructor(
    private readonly incityService: IncityService,
    private readonly scheduleRegistry: SchedulerRegistry
  ) {}

  @Get('ping')
  async getData() {
    return this.incityService.ping();
  }

  @Post('reload-all-partners-points')
  async reloadAllPartnersPoints() {
    await this.incityService.createUpdatePointsProfiles();
  }

  @Post('reload-all-remains')
  async reloadAllRemains(@Body() dtos: any) {
    // in dependence of body fetch retail points remains or online store remains
    this.incityService.reloadRetailWarehousesRemains();
  }

  @Cron(CronExpression.EVERY_5_MINUTES, { name: 'test' })
  async cronTest() {
    this.scheduleRegistry.getCronJob('test');
    //console.log(111);
    Logger.log(new Date());
    //this.appService.reloadRemains('', []);
    this.incityService.reloadRetailWarehousesRemains();
  }
}
