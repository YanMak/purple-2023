import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AccountLogin, AccountRegister } from '@purple-2023/contracts';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly rmqService: RMQService) { }

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		console.log(`----------------`);
		console.log(`@Post('register')`);
		console.log(`async register(@Body() dto: RegisterDto) { ${JSON.stringify(dto)}`)
		try {
			return await this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto)
		}
		catch (e) {
			if (e instanceof Error) {
				throw new UnauthorizedException(e.message)
			}
		}
	}

	@Post('login')
	async login(@Body() dto: LoginDto) {
		console.log(`----------------`);
		console.log(`@Post('login')`);
		console.log(`async login(@Body() dto: LoginDto) { ${JSON.stringify(dto)}`)
		try {
			return await this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto)
		}
		catch (e) {
			if (e instanceof Error) {
				throw new UnauthorizedException(e.message)
			}
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('isauth')
	async isauth() {
		return { isauth: true }
	}
}

