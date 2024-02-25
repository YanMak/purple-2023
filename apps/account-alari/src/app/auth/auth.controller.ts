import { Body, Controller, Logger } from '@nestjs/common';
import { AccountLogin_Alari, AccountRegister_Alari } from '@purple-2023/contracts';
import { Message, RMQMessage, RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@RMQValidate()
	@RMQRoute(AccountRegister_Alari.topic)
	async register(dto: AccountRegister_Alari.Request, @RMQMessage msg: Message): Promise<AccountRegister_Alari.Response> {
		const rid = msg.properties.headers['requestId'];
		//const logger = new Logger(rid);
		//logger.error('sdfsdf')
		return this.authService.register(dto);
	}

	@RMQValidate()
	@RMQRoute(AccountLogin_Alari.topic)
	async login(@Body() { email, password }: AccountLogin_Alari.Request): Promise<AccountLogin_Alari.Response> {
		const { id } = await this.authService.validateUser(email, password);
		return this.authService.login(id);
	}
}
