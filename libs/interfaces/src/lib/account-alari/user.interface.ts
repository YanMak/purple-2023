export enum UserRole_Alari {
	Teacher = 'Teacher',
	Student = 'Student'
}

export enum PurchaseState_Alari {
	Started = 'Started',
	WaitingForPayment = 'WaitingForPayment',
	Purchased = 'Purchased',
	Cenceled = 'Cenceled'
}

export interface IUser_Alari {
	_id?: string;
	displayName?: string;
	email: string;
	passwordHash: string;
	role: UserRole_Alari;
	courses?: IUserCourses_Alari[];
}

export interface IUserCourses_Alari {
	courseId: string;
	purchaseState: PurchaseState_Alari;
}