import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeliveryPoint } from '../models/delivery-point.model';
import { DeliveryPointEntity } from '../entities/delivery-point.entity';
import { IDeliveryPointProfile, IWarehouseRemains } from '@purple-2023/interfaces';

@Injectable()
export class DeliveryPointRepository {
	constructor(
		@InjectModel(DeliveryPoint.name) private readonly deliveryPointModel: Model<DeliveryPoint>
	) { }

	async create(point: DeliveryPointEntity) {
		const newPoint = new this.deliveryPointModel(point)
		return newPoint.save()
	}

	async createUpdateProfile(point: IDeliveryPointProfile) {
		const { id, ...rest } = point;
		const existedPoint = await this.deliveryPointModel.findOne({ id }).exec();
		if (!existedPoint) {
			const newPoint = new this.deliveryPointModel(point)
			return newPoint.save()
		}
		else {
			const
				res = await this.deliveryPointModel.updateOne({ id }, { $set: rest });
			return res
		}
	}

	async find(expression: unknown): Promise<DeliveryPointEntity[]> {
		return this.deliveryPointModel.find(expression).exec();
	}

	async findOne(id: string): Promise<DeliveryPointEntity> {
		return this.deliveryPointModel.findOne({ id }).exec();
	}

	/*
	async findPointById(id: string) {
		return this.deliveryPointRemainsModel.findById(id).exec();
	}*/

	async delete(id: string) {
		return this.deliveryPointModel.deleteOne({ id }).exec()
	}

	async setRemains(id: string, newRemains: IWarehouseRemains[]) {

		return this.deliveryPointModel.updateOne({ id }, { $set: { remains: newRemains } })
	}

	async updateRemains(id: string, newRemains: IWarehouseRemains[]) {
		//const remain = newRemains[0];
		const product_ids = newRemains.map(item => item.id)
		//return this.deliveryPointModel.findOne({ id, remains: { '$elemMatch': { barcode: remain.barcode } } });

		//const res1 = await this.deliveryPointModel.updateOne({ id }, { $set: { "remains.$[outer].count": 0 } }, { arrayFilters: [{ 'outer.barcode': { $in: barcodes } }] })
		//console.log('$set')
		//console.log(res1)
		const res2 = await this.deliveryPointModel.updateOne({ id }, { $pull: { remains: { id: { $in: product_ids } } } });
		console.log('$pull')
		console.log(res2)

		const res3 = await this.deliveryPointModel.updateOne({ id }, { $push: { remains: { $each: newRemains } } });
		console.log('$push')
		console.log(res3)

		//return this.deliveryPointModel.updateOne({ id }, { $set: { "remains.$[outer].count": 0 } }, { arrayFilters: [{ 'outer.barcode': { $in: barcodes } }] })
	}

	async getRemainsByPointId(id: string) {
		return (await this.deliveryPointModel.findOne({ id })).remains;
	}

	async getRemainsByFilter() {
		// first apply filter by city and product_ids
		/*{
			"city": "Москва",
				"configurationIds": ["12345", "23456", "34567"]
		}*/
		const product_ids = ["2029000330458"]
		//const res = await this.deliveryPointModel.find({ city: 'Москва' }, { $set: { "remains.$[outer].count": { $gt: 0 } } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] })
		//const res = await this.deliveryPointModel.find({}, { $set: { "remains.$[outer].count": 0 } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] });
		//const res = await this.deliveryPointModel.find({ id: '8bede9c7-4141-11df-81e2-005056b263b2' });
		//const res = await this.deliveryPointModel.find({ "city": "Москва", "remains.$outer.count": { $gt: 5 } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] });
		//const res = await this.deliveryPointModel.find({ "city": "Москва", "remains.[$outer].count": { $gt: 1 } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] });
		//const res = await this.deliveryPointModel.find({ "city": "Москва", remains: { $elemMatch: { count: { $gt: 7 }, id: { $in: product_ids } } } });

		const res = (await this.deliveryPointModel.find(
			{ "city": "Москва", remains: { $elemMatch: { count: { $gt: 0 }, id: { $in: product_ids } } } }
			, { 'id': 1, 'city': 1, "remains": { $elemMatch: { id: { $in: product_ids } } } }
		)

		);


		console.log(res);
		return res;
	}

}