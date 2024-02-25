import { Body, Controller, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { AccountChangeProfile } from '@purple-2023/contracts';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import { ChangeProfileDto } from '../dtos/change-profile.dto';
import { RMQService } from 'nestjs-rmq';

@Controller('user')
export class UserController {
	constructor(private readonly rmqService: RMQService) { }

	@UseGuards(JwtAuthGuard)
	@Post('info')
	async info(@UserId() userId: string) {
		console.log(userId)
		return { userId }
	}

	@UseGuards(JwtAuthGuard)
	@Post('change-profile')
	async changeProfile(@UserId() userId: string, @Body() { user }: ChangeProfileDto) {
		try {
			return await this.rmqService.send<AccountChangeProfile.Request, AccountChangeProfile.Response>(AccountChangeProfile.topic, { id: userId, user })
		}
		catch (e) {
			if (e instanceof Error) {
				throw new NotFoundException(e.message)
			}
		}
	}

}
