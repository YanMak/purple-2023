import { AccountChangedCourse } from '@purple-2023/contracts';
import { IDomainEvent, IUser, IUserCourses, PurchaseState, UserRole } from '@purple-2023/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
	_id?: string;
	displayName?: string;
	email: string;
	passwordHash: string;
	role: UserRole;
	courses: IUserCourses[] = [];
	events: IDomainEvent[] = [];

	//constructor(user: Omit<IUser, 'passwordHash'>) {
	constructor(user: IUser) {
		this._id = user._id
		this.passwordHash = user.passwordHash
		this.displayName = user.displayName
		this.email = user.email
		this.role = user.role
		this.courses = user.courses
	}

	/* all logics now in setCourseState
	public addCourse(courseId: string) {
		const exist = this.courses.find(c => c.courseId === courseId);
		if (exist) {
			throw new Error('added course already exist')
		}
		this.courses.push({ courseId, purchaseState: PurchaseState.Started })
	}

	public deleteCourse(courseId: string) {
		this.courses = this.courses.filter(c => c.courseId != courseId)
	}*/

	public getCourseState(courseId: string): PurchaseState {
		return this.courses.find(c => c.courseId === courseId)?.purchaseState ?? PurchaseState.Started;
	}

	public setCourseState(courseId: string, state: PurchaseState) {
		//console.log(`___________________`);
		//console.log(`setCourseState courseId: ${courseId}, state: PurchaseState ${state}`);
		//console.log(`courseId: ${courseId}, state: ${state}`);
		//console.log(`curr courses:`);
		//console.log(this.courses);
		const exist = this.courses.find(c => c.courseId === courseId);
		//console.log(`exist=${exist}`)
		if (!exist) {
			this.courses.push({
				courseId,
				purchaseState: state
			});
			return this;
		}
		if (state == PurchaseState.Canceled) {
			this.courses.filter(c => c.courseId !== courseId)
			return this
		}
		this.courses = this.courses.map(c => {
			if (c.courseId === courseId) {
				//console.log(`if (c.courseId === courseId)  {  c.purchaseState = ${c.purchaseState} | state = ${state} `);
				c.purchaseState = state;
				return c;
			}
			return c;
		});
		//console.log(`courses after update:`);
		//console.log(this.courses);
		//console.log(`___________________`);
		this.events.push({ topic: AccountChangedCourse.topic, data: { courseId, userid: this._id, state } })
		return this
	}

	public async setPassword(password: string) {
		const salt = await genSalt(10);
		this.passwordHash = await hash(password, salt);
		return this
	}

	public validatePassword(password: string) {
		return compare(password, this.passwordHash)
	}

	public updateUserProfile(displayName: string) {
		this.displayName = displayName
		return this
	}


}