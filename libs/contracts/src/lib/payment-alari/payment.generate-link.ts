import { IsNumber, IsString } from 'class-validator';

export namespace PaymentGenerateLink_Alari {
	export const topic = 'payment-alari.generate-link.command';

	export class Request {
		@IsString()
		courseId: string;

		@IsString()
		userId: string;

		@IsNumber()
		sum: number;
	}

	export class Response {
		paymentLink: string;
	}
}

