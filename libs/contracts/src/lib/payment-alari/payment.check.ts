import { IsString } from 'class-validator';

export type PaymentStatus_Alari = 'canceled' | 'success' | 'progress';

export namespace PaymentCheck_Alari {
	export const topic = 'payment-alari.check.query';

	export class Request {
		@IsString()
		courseId: string;

		@IsString()
		userId: string;
	}

	export class Response {
		status: PaymentStatus_Alari;
	}
}

