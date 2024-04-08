import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogisticsRemains_Warehouse } from '../models/warehouse.model';
import { LogisticsRemains_WarehouseEntity } from '../entities/warehouse.entity';
import {
  ILogisticsRemains_WarehouseRemains,
  IWarehouseRemains,
} from '@purple-2023/interfaces';
import { getMongoRectangleBy2Points } from '../helpers/get-rectangle-by-2-points';

@Injectable()
export class LogisticsRemains_WarehouseRepository {
  constructor(
    @InjectModel(LogisticsRemains_Warehouse.name)
    private readonly warehouseModel: Model<LogisticsRemains_Warehouse>
  ) {}

  async create(point: LogisticsRemains_WarehouseEntity) {
    const newPoint = new this.warehouseModel(point);
    return newPoint.save();
  }

  async createUpdateProfile(point: LogisticsRemains_WarehouseEntity) {
    const { id, remains, ...rest } = point;
    const existedPoint = await this.warehouseModel.findOne({ id }).exec();
    if (!existedPoint) {
      return this.create(point);
    } else {
      const res = await this.warehouseModel.updateOne({ id }, { $set: rest });
      return res;
    }
    console.log(remains.length);
  }

  async find(expression: unknown): Promise<LogisticsRemains_WarehouseEntity[]> {
    return this.warehouseModel.find(expression).exec();
  }

  async findOne(id: string): Promise<LogisticsRemains_WarehouseEntity> {
    return this.warehouseModel.findOne({ id }).exec();
  }

  /*
	async findPointById(id: string) {
		return this.deliveryPointRemainsModel.findById(id).exec();
	}*/

  async delete(id: string) {
    return this.warehouseModel.deleteOne({ id }).exec();
  }

  async setRemains(
    id: string,
    newRemains: ILogisticsRemains_WarehouseRemains[]
  ) {
    return this.warehouseModel.updateOne(
      { id },
      { $set: { remains: newRemains } }
    );
  }

  async updateRemains(id: string, newRemains: IWarehouseRemains[]) {
    //const remain = newRemains[0];
    const product_ids = newRemains.map((item) => item.id);
    //return this.deliveryPointModel.findOne({ id, remains: { '$elemMatch': { barcode: remain.barcode } } });

    //const res1 = await this.deliveryPointModel.updateOne({ id }, { $set: { "remains.$[outer].count": 0 } }, { arrayFilters: [{ 'outer.barcode': { $in: barcodes } }] })
    //console.log('$set')
    //console.log(res1)
    const res2 = await this.warehouseModel.updateOne(
      { id },
      { $pull: { remains: { id: { $in: product_ids } } } }
    );
    console.log('$pull');
    console.log(res2);

    const res3 = await this.warehouseModel.updateOne(
      { id },
      { $push: { remains: { $each: newRemains } } }
    );
    console.log('$push');
    console.log(res3);

    //return this.deliveryPointModel.updateOne({ id }, { $set: { "remains.$[outer].count": 0 } }, { arrayFilters: [{ 'outer.barcode': { $in: barcodes } }] })
  }

  async getRemainsByWarehouseId(id: string) {
    return (await this.warehouseModel.findOne({ id })).remains;
  }

  async getRemainsByFilter() {
    // first apply filter by city and product_ids
    /*{
			"city": "Москва",
				"configurationIds": ["12345", "23456", "34567"]
		}*/
    const product_ids = ['2029000330458'];
    //const res = await this.deliveryPointModel.find({ city: 'Москва' }, { $set: { "remains.$[outer].count": { $gt: 0 } } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] })
    //const res = await this.deliveryPointModel.find({}, { $set: { "remains.$[outer].count": 0 } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] });
    //const res = await this.deliveryPointModel.find({ id: '8bede9c7-4141-11df-81e2-005056b263b2' });
    //const res = await this.deliveryPointModel.find({ "city": "Москва", "remains.$outer.count": { $gt: 5 } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] });
    //const res = await this.deliveryPointModel.find({ "city": "Москва", "remains.[$outer].count": { $gt: 1 } }, { arrayFilters: [{ 'outer.id': { $in: product_ids } }] });
    //const res = await this.deliveryPointModel.find({ "city": "Москва", remains: { $elemMatch: { count: { $gt: 7 }, id: { $in: product_ids } } } });

    const res = await this.warehouseModel.find(
      {
        city: 'Москва',
        remains: {
          $elemMatch: { count: { $gt: 0 }, id: { $in: product_ids } },
        },
      },
      { id: 1, city: 1, remains: { $elemMatch: { id: { $in: product_ids } } } }
    );

    console.log(res);
    return res;
  }

  async near(lng: number, lat: number) {
    return await this.warehouseModel
      .find({
        loc: {
          $near: {
            $geometry: { type: 'Point', coordinates: [lng, lat] },
            $minDistance: 0,
            $maxDistance: 50000,
          },
        },
      })
      .exec();
  }

  async findPointsWithinBox(
    [lngBL, latBL]: [lngBL: number, latBL: number],
    [lngTR, latTR]: [lngTR: number, latTR: number]
  ) {
    const polygon = getMongoRectangleBy2Points([lngBL, latBL], [lngTR, latTR]);
    return await this.warehouseModel
      .find({
        loc: {
          $geoWithin: {
            $geometry: {
              type: 'Polygon',
              /*coordinates: [
                [
                  [50.01965917799224, 30.22131917773438],
                  [50.01965917799224, 55.08826253710938],
                  [58.0151324849334, 55.08826253710938],
                  [58.0151324849334, 30.22131917773438],
                  [50.01965917799224, 30.22131917773438],
                ],*/
              coordinates: polygon,
            },
          },
        },
      })
      .exec();
  }

  async findEmptyLonLat() {
    return await this.warehouseModel
      .find({
        loc: [0, 0],
      })
      .limit(1)
      .exec();
  }

  async getAllPoints() {
    return await this.warehouseModel.find(
      {},
      { loc: 1, id: 1, providerKey: 1 }
    );
  }
}
