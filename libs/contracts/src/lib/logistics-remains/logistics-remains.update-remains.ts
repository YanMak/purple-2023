import { ILogisticsRemains_WarehouseRemains } from '@purple-2023/interfaces';
import { IsString } from 'class-validator';

export namespace LogisticsRemains_UpdateRemains {
  export const topic = 'logistics-remains.update-remains.notification';

  export class Request {
    @IsString()
    id: string;

    remains: ILogisticsRemains_WarehouseRemains;
  }
}
