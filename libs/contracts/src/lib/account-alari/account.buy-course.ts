import { IsString } from 'class-validator';

export namespace AccountBuyCourse_Alari {
	export const topic = 'account-alari.buy-course.query';

	export class Request {
		@IsString()
		userId: string;

		@IsString()
		courseId: string;
	}

	export class Response {
		paymentLink: string;
	}
}

