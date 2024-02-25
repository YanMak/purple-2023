import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { UserModule } from '../user/user.module';
import { AuthModule } from './auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../configs/mongo.config'
import { INestApplication } from '@nestjs/common';
import { UserRepository_Alari } from '../user/repositories/user.repository';
import { AccountLogin_Alari, AccountRegister_Alari } from '@purple-2023/contracts';

const authLogin: AccountLogin_Alari.Request = {
	email: 'a@a.ru',
	password: '1'
}

const authRegister: AccountRegister_Alari.Request = {
	...authLogin,
	displayName: 'Вася'
}

const authRegister2: AccountRegister_Alari.Request = {
	email: 'a2@a.ru',
	password: '1',
	displayName: 'Вася'
}

describe('AuthController', () => {
	let app: INestApplication;
	let userRepository: UserRepository_Alari;
	let rmqService: RMQTestService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
				RMQModule.forTest({}),
				UserModule,
				AuthModule,
				MongooseModule.forRootAsync(getMongoConfig())
			]
		}).compile();
		app = module.createNestApplication();
		userRepository = app.get<UserRepository_Alari>(UserRepository_Alari);
		rmqService = app.get(RMQService);
		await app.init();

		//const res = await userRepository.deleteUser(authRegister.email);
		//console.log(`beforeAll(async () => {`)
		//console.log(res)
	})

	it('Register', async () => {
		const res = await rmqService.triggerRoute<AccountRegister_Alari.Request, AccountRegister_Alari.Response>(
			AccountRegister_Alari.topic,
			authRegister
		);
		expect(res.email).toEqual(authRegister.email);
	});

	it('Register2', async () => {
		const res = await rmqService.triggerRoute<AccountRegister_Alari.Request, AccountRegister_Alari.Response>(
			AccountRegister_Alari.topic,
			authRegister2
		);
		expect(res.email).toEqual(authRegister2.email);
	});


	it('Login', async () => {
		console.log(`it('Login', async () => {`)
		const res = await rmqService.triggerRoute<AccountLogin_Alari.Request, AccountLogin_Alari.Response>(
			AccountLogin_Alari.topic,
			authLogin
		);
		console.log(res)
		console.log('____')
		//console.log(userRepository)
		//await userRepository.deleteUser(authRegister.email);
		expect(res.access_token).toBeDefined();
		//await userRepository.deleteUser(authRegister.email);
	});

	afterAll(async () => {
		//console.log('afterAll(async() => {')
		await userRepository.deleteUser(authRegister.email);
		await userRepository.deleteUser(authRegister2.email);
		//const res = await userRepository.deleteUser(authRegister.email);
		//console.log(`afterAll(async ()  => {  await userRepository.deleteUser(authRegister.email);`)
		//console.log(res)

		await app.close();
	});
});