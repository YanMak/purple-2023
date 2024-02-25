import { Body, Controller } from '@nestjs/common';
import { AccountBuyCourse_Alari, AccountChangeProfile_Alari, AccountCheckPayment_Alari } from '@purple-2023/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from './user.service';

@Controller()
export class UserCommands {
	constructor(private readonly userService: UserService) { }

	@RMQValidate()
	@RMQRoute(AccountChangeProfile_Alari.topic)
	async changeProfile(@Body() { user, id }: AccountChangeProfile_Alari.Request): Promise<AccountChangeProfile_Alari.Response> {
		return this.userService.changeProfile(user, id);
	}

	@RMQValidate()
	@RMQRoute(AccountBuyCourse_Alari.topic)
	async buyCourse(@Body() { userId, courseId }: AccountBuyCourse_Alari.Request): Promise<AccountBuyCourse_Alari.Response> {
		return this.userService.buyCourse(userId, courseId);
	}

	@RMQValidate()
	@RMQRoute(AccountCheckPayment_Alari.topic)
	async checkPayment(@Body() { userId, courseId }: AccountCheckPayment_Alari.Request): Promise<AccountCheckPayment_Alari.Response> {
		return this.userService.checkPayments(userId, courseId);
	}
}
