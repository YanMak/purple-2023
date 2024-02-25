import { IsEmail, IsString } from 'class-validator';

export namespace AccountLogin_Alari {
	export const topic = 'account-alari.login.command';

	export class Request {
		@IsEmail()
		email: string;

		@IsString()
		password: string;
	}

	export class Response {
		access_token: string;
	}
}

