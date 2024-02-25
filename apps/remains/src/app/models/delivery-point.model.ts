import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IDeliveryPoint, IDeliveryService } from '@purple-2023/interfaces';
import { Document, Types } from 'mongoose';
import { IWarehouseRemains } from '@purple-2023/interfaces'

@Schema()
export class WarehouseRemains extends Document implements IWarehouseRemains {
	@Prop({ required: true, index: true })
	id: string;

	@Prop({ required: true, index: true })
	barcode: string;

	@Prop()
	count: number;
}

@Schema()
export class DeliveryService extends Document implements IDeliveryService {
	@Prop()
	id: string;

	@Prop()
	title: string;
}

@Schema()
export class DeliveryPoint extends Document implements IDeliveryPoint {

	@Prop()
	id: string;

	@Prop()
	title: string;

	@Prop()
	city: string;

	@Prop()
	deliveryAvailable: boolean;

	@Prop()
	hasRemains: boolean;

	@Prop()
	remainsReserveAvailable: boolean;

	@Prop()
	workSchedule: string;

	@Prop()
	address: string;

	@Prop({ type: DeliveryService, _id: false })
	deliveryService: DeliveryService;

	@Prop({ type: [WarehouseRemains], _id: false })
	remains: Types.Array<WarehouseRemains>;

	//@Prop({ type: Types.Subdocument, _id: false })
	//warehouseObject: IWarehouseRemainsObject;
	@Prop()
	isOnlineStore: boolean;

}

export const DeliveryPointRemainsSchema = SchemaFactory.createForClass(DeliveryPoint);

/*
@Schema()
export class WarehouseRemainsObject extends Document implements IWarehouseRemainsObject {
	[key: string]: number;
}

export class iii implements IWarehouseRemainsObject {
	[key: string]: number;
}*/
