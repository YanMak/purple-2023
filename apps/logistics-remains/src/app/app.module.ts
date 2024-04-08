import { Module } from '@nestjs/common';

import { AppController } from './api.logistics.controller';
import { AppService } from './api.logistics.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import {
  LogisticsRemains_Warehouse,
  LogisticsRemains_WarehouseSchema,
} from './models/warehouse.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.logistics-remains.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync(getMongoConfig()),
    MongooseModule.forFeature([
      {
        name: LogisticsRemains_Warehouse.name,
        schema: LogisticsRemains_WarehouseSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
