import { AccountChangedCourse_Alari } from '@purple-2023/contracts';
import { IDomainEvent_Alari, IUser_Alari, IUserCourses_Alari, PurchaseState_Alari, UserRole_Alari } from '@purple-2023/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity_Alari implements IUser_Alari {
	_id?: string;
	displayName?: string;
	email: string;
	passwordHash: string;
	role: UserRole_Alari;
	courses?: IUserCourses_Alari[];
	events: IDomainEvent_Alari[] = [];

	constructor(user: IUser_Alari) {
		this._id = user._id;
		this.passwordHash = user.passwordHash;
		this.displayName = user.displayName;
		this.email = user.email;
		this.role = user.role;
		this.courses = user.courses;
	}

	public setCourseStatus(courseId: string, state: PurchaseState_Alari) {
		const exist = this.courses.find(c => c.courseId === courseId);
		if (!exist) {
			this.courses.push({
				courseId,
				purchaseState: state
			});
			return this;
		}
		if (state === PurchaseState_Alari.Cenceled) {
			this.courses = this.courses.filter(c => c.courseId !== courseId);
			return this;
		}
		this.courses = this.courses.map(c => {
			if (c.courseId === courseId) {
				c.purchaseState = state;
				return c;
			}
			return c;
		});
		this.events.push({
			topic: AccountChangedCourse_Alari.topic,
			data: { courseId, userId: this._id, state }
		});
		return this;
	}

	public getCourseState(courseId: string): PurchaseState_Alari {
		return this.courses.find(c => c.courseId === courseId)?.purchaseState ?? PurchaseState_Alari.Started;
	}

	public getPublicProfile() {
		return {
			email: this.email,
			role: this.role,
			displayName: this.displayName
		}
	}

	public async setPassword(password: string) {
		const salt = await genSalt(10);
		this.passwordHash = await hash(password, salt);
		return this;
	}

	public validatePassword(password: string) {
		return compare(password, this.passwordHash);
	}

	public updateProfile(displayName: string) {
		this.displayName = displayName;
		return this;
	}
}