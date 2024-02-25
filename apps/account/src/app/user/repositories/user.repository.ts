import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) { }

	async createUser(user: UserEntity) {
		const newUser = new this.userModel(user)
		return newUser.save()
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findUserById(id: string) {
		return this.userModel.findById(id).exec();
	}

	async delete(email: string) {
		return this.userModel.deleteOne({ email }).exec()
	}

	async updateUser(user: UserEntity) {
		return this.userModel.updateOne({ _id: user._id }, user)
	}
}