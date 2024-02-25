import { Injectable } from '@nestjs/common';
import { WarehouseParameters_Partner_Incity } from './incity.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IWarehouseParametersEntity_Partner_Incity } from './incity.entity';

@Injectable()
export class WarehouseParametersRepository_Partner {
	constructor(
		@InjectModel(WarehouseParameters_Partner_Incity.name) private readonly warehouseParametersModel_Partner: Model<WarehouseParameters_Partner_Incity>
	) { }

	async createUpdate(point: IWarehouseParametersEntity_Partner_Incity) {
		const { id, ...rest } = point;
		const existedPoint = await this.warehouseParametersModel_Partner.findOne({ id }).exec();
		if (!existedPoint) {
			const newPoint = new this.warehouseParametersModel_Partner(point)
			return newPoint.save()
		}
		else {
			const
				res = await this.warehouseParametersModel_Partner.updateOne({ id }, { $set: rest });
			return res
		}
	}

	async delete(id: string) {
		return this.warehouseParametersModel_Partner.deleteOne({ id }).exec()
	}

	async findAll() {
		return this.warehouseParametersModel_Partner.find().exec()
	}

	/*async findConnectionUrl(id: string) {
		const res = await this.deliveryPointModel.findOne({ id }, { 'warehouse.outerURL': 1 }).exec();
		//const res = await this.deliveryPointModel.findOne({ id }).exec();
		//console.log(res)
		return 'http://' + res.warehouse.outerURL;
	}*/

}