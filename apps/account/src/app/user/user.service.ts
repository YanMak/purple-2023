import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { AccountChangeProfile } from '@purple-2023/contracts';
import { RMQService } from 'nestjs-rmq';
import { IUser, IUserCourses, PurchaseState } from '@purple-2023/interfaces';
import { BuyCourseSaga } from './sagas/buy-course.saga';
import { UserEventEmitter } from './user.event-emitter';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly rmqService: RMQService,
		private readonly userEventEmitter: UserEventEmitter
	) { }

	async findUserById(id: string) {
		return this.userRepository.findUserById(id);
	}

	async userInfo(id: string): Promise<{ user: IUser }> {
		const user = await this.userRepository.findUserById(id);
		return { user };
	}

	async userCourses(id: string): Promise<{ courses: IUserCourses[] }> {
		const user = await this.userRepository.findUserById(id);
		return { courses: user.courses };
	}

	async checkPayment({
		userId,
		courseId,
	}: {
		userId: string;
		courseId: string;
	}): Promise<{ state: PurchaseState; user: IUser }> {
		const existedUser = await this.findUserById(userId);
		if (!existedUser) {
			throw new Error('no such user');
		}
		const userEntity = new UserEntity(existedUser);
		const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
		const { state, user } = await saga.getState().checkPayment();
		console.log(`checkPayment await this.updateUser(user)`);
		await this.updateUser(user);
		return { state, user };
	}

	async buyCourse({
		userId,
		courseId,
	}: {
		userId: string;
		courseId: string;
	}): Promise<{ paymentLink: string }> {
		const existedUser = await this.findUserById(userId);
		if (!existedUser) {
			throw new Error('no such user');
		}
		const userEntity = new UserEntity(existedUser);
		const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
		const { paymentLink, user } = await saga.getState().pay();
		//console.log(`----------`)
		//console.log(`buyCourse await this.updateUser(user)`)
		//console.log(user.courses)
		//console.log(`----------`)
		await this.updateUser(user);
		return { paymentLink };
	}

	async updateUserProfile({ id, user }: AccountChangeProfile.Request) {
		//console.log('_____________________');
		//console.log('async register({ email, password, displayName }: AccountRegister.Request) {')
		//console.log(`email ${email}, password ${password}, displayName ${displayName}}`)
		const existedUser = await this.userRepository.findUserById(id);
		console.log('existedUser');
		console.log(existedUser);
		if (!existedUser) {
			console.log('throw new Error(user not found);');
			throw new Error('user not found');
		}

		/*
				const userEntity = await new UserEntity({
					...existedUser
				}).updateUser(displayName);
				*/
		const userEntity = await new UserEntity(existedUser);
		//console.log('userEntity');
		//console.log(userEntity);

		const updatedUserEntity = userEntity.updateUserProfile(user.displayName);
		//console.log('updatedUserEntity');
		//console.log(updatedUserEntity);

		//console.log('newUserEntity');
		//console.log(newUserEntity);

		//await this.userRepository.updateUser(updatedUserEntity);
		await this.updateUser(updatedUserEntity);
		return { user: { ...updatedUserEntity } };
		//return { email: updatedUser.email, displayName: updatedUser.displayName };
	}

	async delete(email: string) {
		return this.userRepository.delete(email);
	}

	async updateUser(user: UserEntity) {
		//return this.userRepository.updateUser(user)
		//console.log(`async updateUser(user: UserEntity) {`);
		//console.log(user.courses);

		return Promise.all([
			this.userRepository.updateUser(user),
			this.userEventEmitter.handle(user),
		]);
	}
}
