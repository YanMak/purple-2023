import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { UserRole } from '@purple-2023/interfaces';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AccountRegister } from '@purple-2023/contracts';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService
	) { }

	async register({ email, password, displayName }: AccountRegister.Request) {
		//console.log('_____________________');
		//console.log('async register({ email, password, displayName }: AccountRegister.Request) {')
		//console.log(`email ${email}, password ${password}, displayName ${displayName}}`)
		const oldUser = await this.userRepository.findUser(email);
		//console.log('oldUser');
		//console.log(oldUser);
		if (oldUser) {
			throw new Error('such user already registered');
		}
		const newUserEntity = await new UserEntity({
			email,
			displayName,
			role: UserRole.Student,
			passwordHash: '',
			courses: []
		}).setPassword(password);
		//console.log('newUserEntity');
		//console.log(newUserEntity);

		const newUser = await this.userRepository.createUser(newUserEntity);
		return { email: newUser.email };
	}

	async validateUser(email: string, password: string) {
		const oldUser = await this.userRepository.findUser(email);
		if (!oldUser) {
			throw new Error('Wrong user or password');
		}
		const userEntity = new UserEntity(oldUser);
		const isCorrectPassword = await userEntity.validatePassword(password);
		if (!isCorrectPassword) {
			throw new Error('Wrong user or password');
		}
		return { id: oldUser._id };
	}

	async login(id: string) {
		return {
			access_token: await this.jwtService.signAsync({ id })
		}
	}
}