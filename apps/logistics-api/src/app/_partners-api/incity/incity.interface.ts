export interface IWarehouseRemains_Partner_Incity_V1 {
	"Артикул": string,
	"Штрихкод": string,
	"КоличествоОстаток": number
}

export interface IWarehouseRemains_Partner_Incity_V2 {
	id: string;
	barcode: string;
	count: number;
}

export interface IWarehouseParameters_Partner_Incity {
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
}