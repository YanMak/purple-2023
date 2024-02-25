import { IUser, PurchaseState } from '@purple-2023/interfaces';
import { IsString } from 'class-validator'

export namespace AccountCheckPayment {
	export const topic = 'account.check-payment.query';
	export class Request {

		@IsString()
		userId: string;

		@IsString()
		courseId: string;
	}

	export class Response {

		state: PurchaseState;
		user: IUser
	}
}