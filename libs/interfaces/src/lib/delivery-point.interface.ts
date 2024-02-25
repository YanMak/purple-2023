export interface IWarehouseRemains {
	id: string;
	barcode: string;
	count: number;
}

//export type typeWarehouseRemainsObject = Record<string, number>

//export interface IWarehouseRemainsObject {
//	[key: string]: number
//}

export interface IDeliveryService {
	id: string;
	title: string;
}

export interface IDeliveryPointProfile {
	id: string;
	title: string;

	city: string;
	deliveryAvailable: boolean;
	hasRemains: boolean;
	remainsReserveAvailable: boolean;
	workSchedule: string;
	address: string;
	deliveryService: IDeliveryService;
	isOnlineStore: boolean
}

export interface IDeliveryPoint extends IDeliveryPointProfile {

	remains: IWarehouseRemains[];
	//remainsObject: IWarehouseRemainsObject

}