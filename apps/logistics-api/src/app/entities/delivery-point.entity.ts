import { ILogisticsApi_createPickupPointDto } from '../interfaces/create.pickup-point.dto';

export class LogisticsApi_pickupPointEntity
  implements ILogisticsApi_createPickupPointDto
{
  id: string;
  title: string;
  lat: number;
  lng: number;
  loc: number[];
  providerKey: string;
  address: string;

  constructor(point: ILogisticsApi_createPickupPointDto) {
    this.id = point.id;
    this.lat = point.lat;
    this.lng = point.lng;
    this.title = point.title;
    this.loc = [point.lng, point.lat];
    this.providerKey = point.providerKey;
    this.address = point.address;
  }
}
