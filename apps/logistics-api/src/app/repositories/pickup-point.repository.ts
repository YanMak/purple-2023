import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LogisticsApi_pickupPoint } from '../models/pickup-point.model';
import { Model } from 'mongoose';
import { LogisticsApi_pickupPointEntity } from '../entities/delivery-point.entity';
import { getMongoRectangleBy2Points } from '../helpers/get-rectangle-by-2-points';

@Injectable()
export class LogisticsApi_pickupPointRepository {
  constructor(
    @InjectModel(LogisticsApi_pickupPoint.name)
    private readonly pickupPointModel: Model<LogisticsApi_pickupPoint>
  ) {}

  async create(point: LogisticsApi_pickupPointEntity) {
    const newPoint = new this.pickupPointModel(point);
    return newPoint.save();
  }

  async createUpdateProfile(point: LogisticsApi_pickupPointEntity) {
    //console.log('repository createUpdateProfile');
    //console.log(point);
    const { id, ...rest } = point;
    console.log('createUpdateProfile point');
    console.log(point);
    const existedPoint = await this.pickupPointModel.findOne({ id }).exec();
    if (!existedPoint) {
      const newPoint = new this.pickupPointModel(point);
      return newPoint.save();
    } else {
      const res = await this.pickupPointModel.updateOne({ id }, { $set: rest });
      return res;
    }
  }

  async near(lng: number, lat: number) {
    return await this.pickupPointModel
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
    return await this.pickupPointModel
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
    return await this.pickupPointModel
      .find({
        loc: [0, 0],
      })
      .limit(1)
      .exec();
  }

  async getAllPoints() {
    return await this.pickupPointModel.find(
      {},
      { loc: 1, id: 1, providerKey: 1 }
    );
  }
}
