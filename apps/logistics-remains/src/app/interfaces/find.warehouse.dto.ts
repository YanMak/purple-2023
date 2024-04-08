export interface ILogisticsRemains_findNearestWarehouseDto {
  lng: number;
  lat: number;
}

export interface ILogisticsRemains_findWarehouseWithinAreaDto {
  lngBL: number; // leftBottom
  latBL: number; // leftBottom
  lngTR: number; // topRight
  latTR: number; // topRight
}
