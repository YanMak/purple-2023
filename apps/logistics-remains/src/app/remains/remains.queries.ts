import { Controller } from '@nestjs/common';
import { LogisticsRemains_RemainsService } from './remains.service';
import { LogisticsRemains_WarehouseRepository } from '../repositories/warehouse.repository';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class LogisticsRemains_RemainsQueries {
  constructor(
    private readonly warehouseRepository: LogisticsRemains_WarehouseRepository,
    private readonly remainsService: LogisticsRemains_RemainsService
  ) {}

  @RMQRoute('LogisticsRemains.commands.topic')
  async query(): Promise<void> {}
}
