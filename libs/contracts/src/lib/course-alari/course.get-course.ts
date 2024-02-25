import { ICourse_Alari } from '@purple-2023/interfaces';
import { IsString } from 'class-validator';

export namespace CourseGetCourse_Alari {
	export const topic = 'course-alari.get-course.query';

	export class Request {
		@IsString()
		id: string;
	}

	export class Response {
		course: ICourse_Alari | null;
	}
}

