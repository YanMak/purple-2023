export interface ILogisticsApi_findNearestPickupPointQueryDto {
  lng: number;
  lat: number;
}

export interface ILogisticsApi_findPickupPointsWithinAreaQueryDto {
  lngBL: number; // leftBottom
  latBL: number; // leftBottom
  lngTR: number; // topRight
  latTR: number; // topRight
}
