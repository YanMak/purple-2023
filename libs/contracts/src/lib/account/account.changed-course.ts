import { PurchaseState } from '@purple-2023/interfaces';
import { IsString } from 'class-validator'

export namespace AccountChangedCourse {
	export const topic = 'account.changed-course.event';
	export class Request {

		@IsString()
		userId: string;

		@IsString()
		courseId: string;

		@IsString()
		state: PurchaseState
	}

}