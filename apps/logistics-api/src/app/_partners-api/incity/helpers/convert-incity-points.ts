import { ILogisticsApi_createPickupPointDto } from '../../../interfaces/create.pickup-point.dto';
import { INCITY_PROVIDER_KEY } from '../incity.constants';
import { IWarehouseParameters_Partner_Incity } from '../incity.interface';

export const convertIncityPoint = (
  incityPoint: IWarehouseParameters_Partner_Incity
): ILogisticsApi_createPickupPointDto => {
  return {
    id: incityPoint.id,
    lat: 0,
    lng: 0,
    title: incityPoint.title,
    providerKey: INCITY_PROVIDER_KEY,
    address: incityPoint.address,
  };
};
