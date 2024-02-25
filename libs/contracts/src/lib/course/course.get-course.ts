import { ICourse } from '@purple-2023/interfaces';
import { IsString } from 'class-validator'

export namespace CourseGetCourse {
	export const topic = 'course.get-course.query';

	export class Request {

		@IsString()
		id: string;

	}

	export class Response {

		course: ICourse | null;

	}
}