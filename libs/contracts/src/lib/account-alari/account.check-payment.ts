import { IsString } from 'class-validator';
import { PaymentStatus_Alari } from '../payment-alari/payment.check';

export namespace AccountCheckPayment_Alari {
	export const topic = 'account-alari.check-payment.command';

	export class Request {
		@IsString()
		userId: string;

		@IsString()
		courseId: string;
	}

	export class Response {
		status: PaymentStatus_Alari;
	}
}

