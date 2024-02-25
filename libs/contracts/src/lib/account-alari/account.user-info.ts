import { IUser_Alari } from '@purple-2023/interfaces';
import { IsString } from 'class-validator';

export namespace AccountUserInfo_Alari {
	export const topic = 'account-alari.user-info.query';

	export class Request {
		@IsString()
		id: string;
	}

	export class Response {
		profile: Omit<IUser_Alari, 'passwordHash'>;
	}
}

