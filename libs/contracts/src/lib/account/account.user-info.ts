import { IUser } from '@purple-2023/interfaces';
import { IsString } from 'class-validator'

export namespace AccountUserInfo {
	export const topic = 'account.user-info.query';

	export class Request {

		@IsString()
		id: string;

	}

	export class Response {

		user: Omit<IUser, 'passwordHash'>

	}
}