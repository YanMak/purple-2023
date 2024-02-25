import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRegister_Alari } from '@purple-2023/contracts';
import { UserRole_Alari } from '@purple-2023/interfaces';
import { UserEntity_Alari } from '../user/entities/user.entity';
import { UserRepository_Alari } from '../user/repositories/user.repository';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository_Alari,
		private readonly jwtService: JwtService
	) { }

	async register({ email, password, displayName }: AccountRegister_Alari.Request) {
		const oldUser = await this.userRepository.findUser(email);
		if (oldUser) {
			throw new Error('Такой пользователь уже зарегистрирован');
		}
		const newUserEntity = await new UserEntity_Alari({
			displayName,
			email,
			passwordHash: '',
			role: UserRole_Alari.Student
		}).setPassword(password);
		const newUser = await this.userRepository.createUser(newUserEntity);
		return { email: newUser.email };
	}

	async validateUser(email: string, password: string) {
		const user = await this.userRepository.findUser(email);
		if (!user) {
			throw new Error('Неверный логин или пароль');
		}
		const userEntity = new UserEntity_Alari(user);
		const isCorrectPassword = await userEntity.validatePassword(password);
		if (!isCorrectPassword) {
			throw new Error('Неверный логин или пароль');
		}
		return { id: user._id };
	}

	async login(id: string) {
		return {
			access_token: await this.jwtService.signAsync({ id })
		}
	}
}
