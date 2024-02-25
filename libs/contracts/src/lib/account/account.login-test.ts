import { IsEmail, IsString } from 'class-validator'

export namespace AccountLoginTest {
	export const topic = 'account.login-test.command';

	export class Request {
		@IsEmail()
		email: string;

		@IsString()
		password: string;
	}

	export class Response {

		access_token: string

	}
}