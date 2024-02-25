import { IUserCourses_Alari } from '@purple-2023/interfaces';
import { IsString } from 'class-validator';

export namespace AccountUserCourses_Alari {
	export const topic = 'account-alari.user-courses.query';

	export class Request {
		@IsString()
		id: string;
	}

	export class Response {
		courses: IUserCourses_Alari[];
	}
}

