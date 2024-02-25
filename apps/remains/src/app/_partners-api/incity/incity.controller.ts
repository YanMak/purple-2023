import { Body, Controller, Get, Post } from '@nestjs/common';

import { IWarehouseRemains } from '@purple-2023/interfaces';
import { IncityService } from './incity.service';

@Controller('incity')
export class IncityController {
	constructor(private readonly incityService: IncityService) { }

	@Get('ping')
	async getData() {
		return this.incityService.ping();
	}

	@Post('reload-all-partners-points')
	async reloadAllPartnersPoints() {
		await this.incityService.createUpdatePointsProfiles();
	}

	@Post('reload-all-remains')
	async reloadAllRemains(@Body() dtos: any) {
		// in dependence of body fetch retail points remains or online store remains
		this.incityService.reloadRetailWarehousesRemains();
	}

}
