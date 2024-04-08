import { IDeliveryService } from '@purple-2023/interfaces';
import { ILogisticsApi_createPickupPointDto } from '../../interfaces/create.warehouse.dto';

export const INCITY_DELIVERY_SERVICE: IDeliveryService = {
  id: 'INCITY',
  title: 'INCITY',
};

export const INCITY_PROVIDER_KEY = 'incity';
export const INCITY_ONLINESTORE_POINT: ILogisticsApi_createPickupPointDto = {
  id: '7d21ab8d-c44f-11e2-aa68-0050569a6bbc',
  lat: 0,
  lng: 0,
  title: 'Интернет магазин (склад Быково)',
  providerKey: INCITY_PROVIDER_KEY,
  address:
    'Московская обл, г Раменское, рп Быково, ул Аэропортовская, д 14К, кв 24',
};
