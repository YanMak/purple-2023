import {
  ILogisticsRemains_Warehouse,
  ILogisticsRemains_WarehouseRemains,
} from '@purple-2023/interfaces';

export class LogisticsRemains_WarehouseEntity
  implements ILogisticsRemains_Warehouse
{
  id: string;
  title: string;
  address: string;
  remains: ILogisticsRemains_WarehouseRemains[];
  loc: number[];
  providerKey: string;

  constructor(point: ILogisticsRemains_Warehouse) {
    this.id = point.id;
    this.title = point.title;
    this.address = point.address;
    this.remains = point.remains;
  }
}
