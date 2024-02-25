import { IUser } from '@purple-2023/interfaces';

/*
export class ChangeProfileDto {
	@IsString()
	id: string;

	user: Omit<IUser, 'passwordHash'>;
}*/

export class ChangeProfileDto {

	user: Omit<IUser, 'passwordHash'>;
}