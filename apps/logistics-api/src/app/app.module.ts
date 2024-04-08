import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import {
  LogisticsApi_pickupPoint,
  LogisticsApi_pickupPointSchema,
} from './models/pickup-point.model';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ApishipModule } from './_partners-api/apiship/apiship.module';
import { LogisticsApi_pickupPointRepository } from './repositories/pickup-point.repository';
import { Partner_Incity_Module } from './_partners-api/incity/incity.module';
import { DadataModule } from './_partners-api/dadata/dadata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.logistics-remains.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    MongooseModule.forRootAsync(getMongoConfig()),
    MongooseModule.forFeature([
      {
        name: LogisticsApi_pickupPoint.name,
        schema: LogisticsApi_pickupPointSchema,
      },
    ]),
    ApishipModule,
    Partner_Incity_Module,
    DadataModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogisticsApi_pickupPointRepository],
})
export class AppModule {}
