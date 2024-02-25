import { IUser } from '@purple-2023/interfaces';
import { IsString } from 'class-validator';

export namespace AccountChangeProfile {
	export const topic = 'account.change-profile.command';

	export class Request {

		@IsString()
		id: string;

		user: Pick<IUser, 'displayName'>;

	}

	export class Response {

		user: Omit<IUser, 'passwordHash'>

	}
}