import { Body, Controller } from '@nestjs/common';
import { AccountLoginTest } from '@purple-2023/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class AuthControllerTest {
	constructor() { }

	@RMQValidate()
	@RMQRoute(AccountLoginTest.topic)
	async loginTest(@Body() { email, password }: AccountLoginTest.Request): Promise<AccountLoginTest.Response> {
		//console.log(`----------------`);
		//console.log(`@RMQRoute(loginTest.topic)`);
		//console.log(`async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> { ${JSON.stringify({ email, password })}`)
		//const { id } = await this.authService.validateUser(email, password)
		//return this.authService.login(id)
		return { access_token: 'chachacha' }
	}
}

