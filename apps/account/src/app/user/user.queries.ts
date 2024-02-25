import { Body, Controller } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountCheckPayment, AccountUserCourses, AccountUserInfo } from '@purple-2023/contracts';
import { UserService } from './user.service';


@Controller()
export class UserQueries {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userService: UserService,
	) { }

	@RMQValidate()
	@RMQRoute(AccountUserInfo.topic)
	async userInfo(@Body() { id }: AccountUserInfo.Request): Promise<AccountUserInfo.Response> {
		return await this.userService.userInfo(id)
	}

	@RMQValidate()
	@RMQRoute(AccountUserInfo.topic)
	async userCourses(@Body() { id }: AccountUserCourses.Request): Promise<AccountUserCourses.Response> {
		return await this.userService.userCourses(id);
	}

	@RMQValidate()
	@RMQRoute(AccountCheckPayment.topic)
	async checkPayment(@Body() dto: AccountCheckPayment.Request): Promise<AccountCheckPayment.Response> {

		return await this.userService.checkPayment(dto)
	}

}