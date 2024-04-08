import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ILogisticsRemains_Warehouse,
  ILogisticsRemains_WarehouseRemains,
} from '@purple-2023/interfaces';
import { Document, Types } from 'mongoose';

@Schema()
export class WarehouseRemains
  extends Document
  implements ILogisticsRemains_WarehouseRemains
{
  @Prop({ required: true, index: true })
  id: string;

  @Prop({ required: true, index: true })
  barcode: string;

  @Prop()
  count: number;
}

@Schema()
export class LogisticsRemains_Warehouse
  extends Document
  implements ILogisticsRemains_Warehouse
{
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

  @Prop({ type: [WarehouseRemains], _id: false })
  remains: Types.Array<WarehouseRemains>;
}

export const LogisticsRemains_WarehouseSchema = SchemaFactory.createForClass(
  LogisticsRemains_Warehouse
);

LogisticsRemains_WarehouseSchema.index({
  loc: '2dsphere',
});
