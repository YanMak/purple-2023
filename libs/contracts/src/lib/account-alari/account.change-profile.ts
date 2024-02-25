import { IUser_Alari } from '@purple-2023/interfaces';
import { IsString } from 'class-validator';

export namespace AccountChangeProfile_Alari {
	export const topic = 'account-alari.change-profile.command';

	export class Request {
		@IsString()
		id: string;

		@IsString()
		user: Pick<IUser_Alari, 'displayName'>;
	}

	export class Response { }
}

