import { ILogisticsApi_createPickupPointDto } from '../../../interfaces/create.pickup-point.dto';
import { IApiship_listsPoints } from '../interfaces/points.interface';

export const convertApishipPoint = (
  apishipPoint: IApiship_listsPoints
): ILogisticsApi_createPickupPointDto => {
  return {
    id: apishipPoint.id,
    lat: apishipPoint.lat,
    lng: apishipPoint.lng,
    title: apishipPoint.name,
    providerKey: apishipPoint.providerKey,
    address: apishipPoint.address,
  };
};
