/* eslint-disable @nx/enforce-module-boundaries */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { UserModule } from './user.module';
//import { UserModule as UserModuleAlari } from '../../../../account-alari/src/app/user/user.module';
import { AuthModule } from '../auth/auth.module';
//import { AuthModule as AuthModuleAlari } from '../../../../account-alari/src/app/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../configs/mongo.config';
import { INestApplication } from '@nestjs/common';
//import { UserRepository_Alari } from '../user/repositories/user.repository';
import { UserService } from './user.service';
//import { UserRepository_Alari } from '../../../../account-alari/src/app/user/repositories/user.repository';

import {
  AccountBuyCourse,
  AccountCheckPayment,
  AccountLogin,
  AccountRegister,
  AccountUserInfo,
  CourseGetCourse,
  PaymentCheck,
  PaymentGenerateLink,
} from '@purple-2023/contracts';
import { verify } from 'jsonwebtoken';
import { PurchaseState } from '@purple-2023/interfaces';

const authLoginAlari: AccountLogin.Request = {
  email: 'a_2@a.ru',
  password: '1',
};

const authRegisterAlari: AccountRegister.Request = {
  ...authLoginAlari,
  displayName: 'Вася',
};

const authLogin2Alari: AccountLogin.Request = {
  email: 'a2_2@a.ru',
  password: '1',
};

const authRegister2Alari: AccountRegister.Request = {
  ...authLogin2Alari,
  displayName: 'Вася2',
};

const courseId = 'courseId';

describe('AuthController', () => {
  let app: INestApplication;
  //let userRepositoryAlari: UserRepository_Alari;
  let userService: UserService;
  let rmqService: RMQTestService;
  let token: string;
  let configService: ConfigService;
  let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'envs/.account.env',
        }),
        RMQModule.forTest({}),
        //UserModuleAlari,
        //AuthModuleAlari,
        //UserModule,
        AuthModule,
        MongooseModule.forRootAsync(getMongoConfig()),
      ],
    }).compile();
    app = module.createNestApplication();
    //userRepositoryAlari = app.get<UserRepository_Alari>(UserRepository_Alari);
    userService = app.get(UserService);
    rmqService = app.get(RMQService);
    configService = app.get(ConfigService);
    await app.init();

    const regData = await rmqService.triggerRoute<
      AccountRegister.Request,
      AccountRegister.Response
    >(AccountRegister.topic, authRegisterAlari);
    const { access_token } = await rmqService.triggerRoute<
      AccountLogin.Request,
      AccountLogin.Response
    >(AccountLogin.topic, authLoginAlari);
    token = access_token;
    const data = await verify(token, configService.get('JWT_SECRET'));
    userId = data['id'];
    console.log(userId);
    //const res = await userRepository.deleteUser(authRegister.email);
    //console.log(`beforeAll(async () => {`)
    //console.log(res)
  });

  it('AccountUserInfo', async () => {
    //console.log(`it('Login', async () => {`)
    const res = await rmqService.triggerRoute<
      AccountLogin.Request,
      AccountLogin.Response
    >(AccountLogin.topic, authLoginAlari);
    //console.log(res)
    //console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.access_token).toBeDefined();
    //await userRepository.deleteUser(authRegister.email);
  });

  it('CourseBuyCourse', async () => {
    const paymentLink = 'paymentLink';
    rmqService.mockReply<CourseGetCourse.Response>(CourseGetCourse.topic, {
      course: { _id: courseId, price: 1000 },
    });
    rmqService.mockReply<PaymentGenerateLink.Response>(
      PaymentGenerateLink.topic,
      { paymentLink }
    );

    const res = await rmqService.triggerRoute<
      AccountBuyCourse.Request,
      AccountBuyCourse.Response
    >(AccountBuyCourse.topic, { courseId, userId });

    //console.log(res)
    //console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.paymentLink).toEqual(paymentLink);
    console.log(`res.paymentLink: ${res.paymentLink}`);

    //const res2 = await rmqService.triggerRoute<AccountBuyCourse.Request, AccountBuyCourse.Response>(AccountBuyCourse.topic, { courseId, userId });
    //console.log(`res2: ${JSON.stringify(res2)}`)

    await expect(
      rmqService.triggerRoute<
        AccountBuyCourse.Request,
        AccountBuyCourse.Response
      >(AccountBuyCourse.topic, { courseId, userId })
    ).rejects.toThrow();
  });

  it('CourseCheckPayment', async () => {
    rmqService.mockReply<PaymentCheck.Response>(PaymentCheck.topic, {
      state: PurchaseState.Purchased,
    });
    const res = await rmqService.triggerRoute<
      AccountCheckPayment.Request,
      AccountCheckPayment.Response
    >(AccountCheckPayment.topic, { courseId, userId });
    expect((res.state = PurchaseState.Purchased));
    console.log(res);
  });

  /*
	it('AccountUserInfo2', async () => {
		//const res = await rmqService.triggerRoute<AccountUserInfo.Request, AccountUserInfo.Response>(AccountUserInfo.topic, { id: userId });
		//expect(res.user.email).toEqual(authLoginAlari.email);
		expect(authLoginAlari.email).toEqual(authLoginAlari.email);
	});
*/

  afterAll(async () => {
    //console.log('afterAll(async() => {')
    //await userRepositoryAlari.deleteUser(authRegisterAlari.email);
    //await userRepositoryAlari.deleteUser(authRegister2Alari.email);

    //const res1 = await userService.delete(authRegisterAlari.email);
    //const res2 = await userService.delete(authRegister2Alari.email);

    //const res = await userRepository.deleteUser(authRegister.email);
    //console.log(`afterAll(async ()  => {  await userRepository.deleteUser(authRegister.email);`)
    //console.log(res)

    await app.close();
  });
});
