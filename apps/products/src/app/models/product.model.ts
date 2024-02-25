import { IProduct, IProductCategory, IRec } from '@purple-2023/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class ProductCategory extends Document implements IProductCategory {
	@Prop()
	id: string;

	@Prop()
	title: string;

	@Prop()
	parentId: string;

	@Prop()
	picture: string;
}

export class Rec extends Document implements IRec {
	@Prop()
	id: string;

	@Prop()
	title: string;

	@Prop({ type: [String], _id: false })
	value: string[];
}

@Schema()
export class Product extends Document implements IProduct {

	@Prop()
	title: string;

	@Prop()
	id: string;

	@Prop()
	available: boolean;

	@Prop()
	publishedOn: globalThis.Date;

	@Prop()
	itemPreviewUrl: string;

	@Prop()
	uuid: string;

	@Prop()
	sizeGridImage: string;

	@Prop()
	groupId: string;

	@Prop()
	barcodes: string[];

	@Prop()
	sort: number;

	@Prop()
	url: string;

	@Prop()
	modelName: string;

	@Prop()
	categoryIds: string[];

	@Prop()
	param: string[][];

	@Prop()
	pictures: string[];

	@Prop()
	currencyId: string;

	@Prop()
	price: number;

	@Prop()
	priceUnits: string;

	@Prop()
	oldPrice: number;

	@Prop()
	priceLabel: string;

	@Prop()
	description: string;

	@Prop()
	collapsibleDescription: string;

	@Prop({ type: [Rec], _id: false })
	rec: Types.Array<Rec>

	@Prop()
	vat: string;

	@Prop()
	fraction: string;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory)
export const DeliveryPointRemainsSchema = SchemaFactory.createForClass(Product);
