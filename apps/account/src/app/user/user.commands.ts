import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { AccountBuyCourse, AccountChangeProfile } from '@purple-2023/contracts';

@Controller()
export class UserCommands {
	constructor(
		private readonly userService: UserService,
		private readonly rmqService: RMQService
	) { }

	/*@RMQValidate()
	@RMQRoute(AccountChangeProfile.topic)
	async changeProfile(@Body() { id, user }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
		console.log('async changeProfile(@Body() { id, user }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response');
		console.log({ id, user });
		const updatedUser = await this.userService.updateUser({ id, user })
		return { user: updatedUser }
	}*/

	@RMQValidate()
	@RMQRoute(AccountChangeProfile.topic)
	async changeProfile(@Body() dto: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
		//console.log('async changeProfile(@Body() { id, user }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response');
		//console.log(dto);
		//const updatedUser = await this.userService.updateUserProfile({ id: dto.id, user: dto.user })
		//return { user: updatedUser }
		return this.userService.updateUserProfile(dto)
	}

	@RMQValidate()
	@RMQRoute(AccountBuyCourse.topic)
	async buyCourse(@Body() dto: AccountBuyCourse.Request): Promise<AccountBuyCourse.Response> {
		return this.userService.buyCourse(dto)
	}
}