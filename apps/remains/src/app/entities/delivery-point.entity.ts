import { IDeliveryPoint, IDeliveryService, IWarehouseRemains } from '@purple-2023/interfaces';

export class DeliveryPointEntity implements IDeliveryPoint {
	id: string;
	title: string;
	deliveryAvailable: boolean;
	hasRemains: boolean;
	remainsReserveAvailable: boolean;
	workSchedule: string;
	address: string;
	deliveryService: IDeliveryService;
	remains: IWarehouseRemains[] = [];
	isOnlineStore: boolean;
	city: string;

	constructor(point: IDeliveryPoint) {
		this.id = point.id;
		this.title = point.title;
		this.deliveryAvailable = point.deliveryAvailable;
		this.hasRemains = point.hasRemains;
		this.remainsReserveAvailable = point.remainsReserveAvailable;
		this.workSchedule = point.workSchedule;
		this.address = point.address;
		this.deliveryService = point.deliveryService;
		this.remains = point.remains
		this.isOnlineStore = point.isOnlineStore;
		this.city = point.city
		//this.remainsObject = point.remainsObject
	}

	/*
	public updateWarehouseProfile(point: IDeliveryPointRemains){
		const newPointEntity = new Delive
	}(*/
}