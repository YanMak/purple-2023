import { IsEmail, IsOptional, IsString } from 'class-validator';

export namespace AccountRegister_Alari {
	export const topic = 'account-alari.register.command';

	export class Request {
		@IsEmail()
		email: string;

		@IsString()
		password: string;

		@IsOptional()
		@IsString()
		displayName?: string;
	}

	export class Response {
		email: string;
	}
}

