import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ILogisticsApi_createPickupPointDto } from '../interfaces/create.pickup-point.dto';

@Schema()
export class LogisticsApi_pickupPoint
  extends Document
  implements ILogisticsApi_createPickupPointDto
{
  lat: number;
  lng: number;

  @Prop()
  id: string;

  @Prop()
  title: string;

  //@Prop({ type: [Number], index: '2dsphere' })
  //loc: number[];
  @Prop({ index: '2dsphere', type: [Number] })
  loc: number[];

  @Prop()
  providerKey: string;

  @Prop()
  address: string;
}

export const LogisticsApi_pickupPointSchema = SchemaFactory.createForClass(
  LogisticsApi_pickupPoint
);
LogisticsApi_pickupPointSchema.index({
  loc: '2dsphere',
});
