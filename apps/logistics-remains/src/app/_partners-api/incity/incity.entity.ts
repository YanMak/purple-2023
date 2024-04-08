import { IWarehouseParameters_Partner_Incity } from './incity.interface';

export class IWarehouseParametersEntity_Partner_Incity implements IWarehouseParameters_Partner_Incity {
	id: string;
	title: string;
	has_deseo_corner: boolean;
	city: string;
	address: string;
	own_store: boolean;
	im_orders: boolean;
	pick_in_store: boolean;
	localURL: string;
	outerIP: string;
	outerURL: string;
	servicePath: string;
	dataBase: string;
	login: string;
	password: string;
	port: number;
	server: string;
	phone: string;
	subway: string;
	subwayID: string;
	deseo: boolean;
	region: string;
	lpost_address: string;
	predstavlenie: string;

	constructor(point: IWarehouseParameters_Partner_Incity) {
		this.id = point.id;
		this.title = point.title;
		this.has_deseo_corner = point.has_deseo_corner;
		this.city = point.city;
		this.address = point.address;
		this.own_store = point.own_store;
		this.im_orders = point.im_orders;
		this.pick_in_store = point.pick_in_store;
		this.localURL = point.localURL;
		this.outerIP = point.outerIP;
		this.servicePath = point.servicePath;
		this.dataBase = point.dataBase;
		this.login = point.login;
		this.password = point.password;
		this.port = point.port;
		this.server = point.server;
		this.phone = point.phone;
		this.subway = point.subway;
		this.subwayID = point.subwayID;
		this.deseo = point.deseo;
		this.region = point.region;
		this.lpost_address = point.lpost_address;
		this.predstavlenie = point.predstavlenie;
	}
}