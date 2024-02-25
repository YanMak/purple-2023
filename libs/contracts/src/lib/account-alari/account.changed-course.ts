import { PurchaseState_Alari } from '@purple-2023/interfaces';
import { IsString } from 'class-validator';

export namespace AccountChangedCourse_Alari {
	export const topic = 'account-alari.changed-course.event';

	export class Request {
		@IsString()
		userId: string;

		@IsString()
		courseId: string;

		@IsString()
		state: PurchaseState_Alari;
	}
}

