import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../../configs/mongo.config';
import {
  WarehouseParametersSchema_Partner_Incity,
  WarehouseParameters_Partner_Incity,
} from './incity.model';
import { IncityController } from './incity.controller';
import { IncityService } from './incity.service';
import { WarehouseParametersRepository_Partner } from './incity.repository';
import { IncityService2 } from './incity.service2';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync(getMongoConfig()),
    MongooseModule.forFeature([
      {
        name: WarehouseParameters_Partner_Incity.name,
        schema: WarehouseParametersSchema_Partner_Incity,
      },
    ]),
  ],
  controllers: [IncityController],
  providers: [
    IncityService,
    IncityService2,
    WarehouseParametersRepository_Partner,
  ],
  exports: [IncityService2],
})
export class Partner_Incity_Module {}
