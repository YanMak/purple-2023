import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserEntity_Alari } from './entities/user.entity';

@Injectable()
export class UserEventEmiiter {
	constructor(private readonly rmqService: RMQService) { }

	async handle(user: UserEntity_Alari) {
		for (const event of user.events) {
			await this.rmqService.notify(event.topic, event.data);
		}
	}
}