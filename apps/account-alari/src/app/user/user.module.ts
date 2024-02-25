import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User_Alari, UserSchema_Alari } from './models/user.model';
import { UserRepository_Alari } from './repositories/user.repository';
import { UserCommands } from './user.commands';
import { UserEventEmiiter } from './user.event-immiter';
import { UserQueries } from './user.queries';
import { UserService } from './user.service';

@Module({
	imports: [MongooseModule.forFeature([
		{ name: User_Alari.name, schema: UserSchema_Alari }
	])],
	providers: [UserRepository_Alari, UserEventEmiiter, UserService],
	exports: [UserRepository_Alari],
	controllers: [UserCommands, UserQueries],
})
export class UserModule { }
