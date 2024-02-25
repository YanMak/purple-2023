import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWarehouseParameters_Partner_Incity } from './incity.interface';
import { Document } from 'mongoose';

@Schema()
export class WarehouseParameters_Partner_Incity extends Document implements IWarehouseParameters_Partner_Incity {
	@Prop()
	id: string;

	@Prop()
	title: string;

	@Prop()
	dataBase: string;

	@Prop()
	has_deseo_corner: boolean;

	@Prop()
	city: string;

	@Prop()
	address: string;

	@Prop()
	own_store: boolean;

	@Prop()
	im_orders: boolean;

	@Prop()
	pick_in_store: boolean;

	@Prop()
	localURL: string;

	@Prop()
	outerIP: string;

	@Prop()
	outerURL: string;

	@Prop()
	servicePath: string;

	@Prop()
	login: string;

	@Prop()
	password: string;

	@Prop()
	port: number;

	@Prop()
	server: string;

	@Prop()
	phone: string;

	@Prop()
	subway: string;

	@Prop()
	subwayID: string;

	@Prop()
	deseo: boolean;

	@Prop()
	region: string;

	@Prop()
	lpost_address: string;

	@Prop()
	predstavlenie: string;
}

export const WarehouseParametersSchema_Partner_Incity = SchemaFactory.createForClass(WarehouseParameters_Partner_Incity);
