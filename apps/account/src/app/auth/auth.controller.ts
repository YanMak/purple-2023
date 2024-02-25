import { Body, Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountLogin, AccountRegister } from '@purple-2023/contracts';
import { Message, RMQMessage, RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@RMQValidate()
	@RMQRoute(AccountRegister.topic)
	async register(@Body() dto: AccountRegister.Request, @RMQMessage msg: Message): Promise<AccountRegister.Response> {
		const rid = msg.properties.headers['requestId'];
		//const logger = new Logger(rid);
		//logger.error('sdfsdf')

		//console.log(`----------------`);
		//console.log(`@RMQRoute(AccountRegister.topic)`);
		//console.log(`async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> { ${JSON.stringify(dto)}`)
		return this.authService.register(dto)
	}

	@RMQValidate()
	@RMQRoute(AccountLogin.topic)
	async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
		//console.log(`----------------`);
		//console.log(`@RMQRoute(AccountLogin.topic)`);
		//console.log(`async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> { ${JSON.stringify({ email, password })}`)
		const { id } = await this.authService.validateUser(email, password)
		return this.authService.login(id)
	}

}
