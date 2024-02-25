import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser_Alari, IUserCourses_Alari, PurchaseState_Alari, UserRole_Alari } from '@purple-2023/interfaces';
import { Document, Types } from 'mongoose';

@Schema()
export class UserCourses_Alari extends Document implements IUserCourses_Alari {
	@Prop({ required: true })
	courseId: string;

	@Prop({ required: true, enum: PurchaseState_Alari, type: String })
	purchaseState: PurchaseState_Alari;
}

export const UserCoursesSchema_Alari = SchemaFactory.createForClass(UserCourses_Alari);


@Schema()
export class User_Alari extends Document implements IUser_Alari {
	@Prop()
	displayName?: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ required: true, enum: UserRole_Alari, type: String, default: UserRole_Alari.Student })
	role: UserRole_Alari;

	@Prop({ type: [UserCoursesSchema_Alari], _id: false })
	courses: Types.Array<UserCourses_Alari>
}

export const UserSchema_Alari = SchemaFactory.createForClass(User_Alari);