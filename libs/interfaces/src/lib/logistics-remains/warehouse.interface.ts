import { ILogisticsRemains_WarehouseRemains } from './remains.interface';

export interface ILogisticsRemains_Warehouse {
  id: string;
  title: string;
  loc: number[];
  providerKey: string;
  address: string;
  remains: ILogisticsRemains_WarehouseRemains[];
}
