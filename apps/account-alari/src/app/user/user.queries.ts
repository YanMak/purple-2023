import { Body, Controller } from '@nestjs/common';
import { AccountUserCourses_Alari, AccountUserInfo_Alari } from '@purple-2023/contracts';
import { RMQValidate, RMQRoute } from 'nestjs-rmq';
import { UserEntity_Alari } from './entities/user.entity';
import { UserRepository_Alari } from './repositories/user.repository';

@Controller()
export class UserQueries {
	constructor(private readonly userRepository: UserRepository_Alari) { }

	@RMQValidate()
	@RMQRoute(AccountUserInfo_Alari.topic)
	async userInfo(@Body() { id }: AccountUserInfo_Alari.Request): Promise<AccountUserInfo_Alari.Response> {
		const user = await this.userRepository.findUserById(id);
		const profile = new UserEntity_Alari(user).getPublicProfile();
		return {
			profile
		};
	}

	@RMQValidate()
	@RMQRoute(AccountUserCourses_Alari.topic)
	async userCourses(@Body() { id }: AccountUserCourses_Alari.Request): Promise<AccountUserCourses_Alari.Response> {
		const user = await this.userRepository.findUserById(id);
		return {
			courses: user.courses
		};
	}
}
