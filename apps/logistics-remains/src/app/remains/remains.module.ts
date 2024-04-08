import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticsRemains_RemainsEventEmitter } from './remains.event-emitter';
import { LogisticsRemains_WarehouseRepository } from '../repositories/warehouse.repository';
import {
  LogisticsRemains_Warehouse,
  LogisticsRemains_WarehouseSchema,
} from '../models/warehouse.model';
import { LogisticsRemains_RemainsService } from './remains.service';
import { LogisticsRemains_RemainsCommands } from './remains.commands';
import { LogisticsRemains_RemainsQueries } from './remains.queries';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LogisticsRemains_Warehouse.name,
        schema: LogisticsRemains_WarehouseSchema,
      },
    ]),
  ],
  providers: [
    LogisticsRemains_WarehouseRepository,
    LogisticsRemains_RemainsService,
    LogisticsRemains_RemainsEventEmitter,
  ],
  exports: [LogisticsRemains_RemainsService],
  controllers: [
    LogisticsRemains_RemainsCommands,
    LogisticsRemains_RemainsQueries,
  ],
})
export class LogisticsRemains_RemainsModule {}
