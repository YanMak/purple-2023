import { InjectModel } from '@nestjs/mongoose';
import { User_Alari } from '../models/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserEntity_Alari } from '../entities/user.entity';

@Injectable()
export class UserRepository_Alari {
	constructor(
		@InjectModel(User_Alari.name) private readonly userModel: Model<User_Alari>
	) { }

	async createUser(user: UserEntity_Alari) {
		const newUser = new this.userModel(user);
		return newUser.save();
	}

	async updateUser({ _id, ...rest }: UserEntity_Alari) {
		//console.log()
		return this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec();
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findUserById(id: string) {
		return this.userModel.findById(id).exec();
	}

	async deleteUser(email: string) {
		return this.userModel.deleteOne({ email }).exec();
	}
}