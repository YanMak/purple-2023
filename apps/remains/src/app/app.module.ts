import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryPointRepository } from './repositories/delivery-point.repository';
import {
  DeliveryPoint,
  DeliveryPointRemainsSchema,
} from './models/delivery-point.model';
import { getMongoConfig } from './configs/mongo.config';
import { ConfigModule } from '@nestjs/config';
import { Partner_Incity_Module } from './_partners-api/incity/incity.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    ConfigModule.forRoot({ envFilePath: 'envs/.account.env', isGlobal: true }),
    HttpModule,
    MongooseModule.forRootAsync(getMongoConfig()),
    MongooseModule.forFeature([
      { name: DeliveryPoint.name, schema: DeliveryPointRemainsSchema },
    ]),
    Partner_Incity_Module,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, DeliveryPointRepository],
})
export class AppModule {}
