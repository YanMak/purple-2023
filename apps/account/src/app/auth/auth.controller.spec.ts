/* eslint-disable @nx/enforce-module-boundaries */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { UserModule } from '../user/user.module';
//import { UserModule as UserModuleAlari } from '../../../../account-alari/src/app/user/user.module';
import { AuthModule } from './auth.module';
//import { AuthModule as AuthModuleAlari } from '../../../../account-alari/src/app/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../configs/mongo.config'
import { INestApplication } from '@nestjs/common';
//import { UserRepository_Alari } from '../user/repositories/user.repository';
import { UserService } from '../user/user.service';
//import { UserRepository_Alari } from '../../../../account-alari/src/app/user/repositories/user.repository';

import { AccountLogin, AccountLoginTest, AccountRegister } from '@purple-2023/contracts';

const authLoginAlari: AccountLogin.Request = {
  email: 'a@a.ru',
  password: '1'
}

const authRegisterAlari: AccountRegister.Request = {
  ...authLoginAlari,
  displayName: 'Вася'
}

const authLogin2Alari: AccountLogin.Request = {
  email: 'a2@a.ru',
  password: '1'
}

const authRegister2Alari: AccountRegister.Request = {
  ...authLogin2Alari,
  displayName: 'Вася2'
}



describe('AuthController', () => {
  let app: INestApplication;
  //let userRepositoryAlari: UserRepository_Alari;
  let userService: UserService;
  let rmqService: RMQTestService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
        RMQModule.forTest({}),
        //UserModuleAlari,
        //AuthModuleAlari,
        //UserModule,
        AuthModule,
        MongooseModule.forRootAsync(getMongoConfig())
      ]
    }).compile();
    app = module.createNestApplication();
    //userRepositoryAlari = app.get<UserRepository_Alari>(UserRepository_Alari);
    userService = app.get(UserService);
    rmqService = app.get(RMQService);
    await app.init();

    //const res = await userRepository.deleteUser(authRegister.email);
    //console.log(`beforeAll(async () => {`)
    //console.log(res)

    const res1 = await userService.delete(authRegisterAlari.email);
    const res2 = await userService.delete(authRegister2Alari.email);
  })

  /*
  it('Register-alari', async () => {
    const res = await rmqService.triggerRoute<AccountRegister_Alari.Request, AccountRegister_Alari.Response>(
      AccountRegister_Alari.topic,
      authRegisterAlari
    );
    expect(res.email).toEqual(authRegisterAlari.email);
  });

  it('Register2-alari', async () => {
    const res = await rmqService.triggerRoute<AccountRegister_Alari.Request, AccountRegister_Alari.Response>(
      AccountRegister_Alari.topic,
      authRegister2Alari
    );
    expect(res.email).toEqual(authRegister2Alari.email);
  });

  it('Login-alari', async () => {
    console.log(`it('Login', async () => {`)
    const res = await rmqService.triggerRoute<AccountLogin_Alari.Request, AccountLogin_Alari.Response>(
      AccountLogin_Alari.topic,
      authLoginAlari
    );
    console.log(res)
    console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.access_token).toBeDefined();
    //await userRepository.deleteUser(authRegister.email);
  });

  it('Login2-alari', async () => {
    console.log(`it('Login', async () => {`)
    const res = await rmqService.triggerRoute<AccountLogin_Alari.Request, AccountLogin_Alari.Response>(
      AccountLogin_Alari.topic,
      authLogin2Alari
    );
    console.log(res)
    console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.access_token).toBeDefined();
    //await userRepository.deleteUser(authRegister.email);
  });
  */

  it('Register', async () => {
    const res = await rmqService.triggerRoute<AccountRegister.Request, AccountRegister.Response>(
      AccountRegister.topic,
      authRegisterAlari
    );
    expect(res.email).toEqual(authRegisterAlari.email);
  });

  it('Register2', async () => {
    const res = await rmqService.triggerRoute<AccountRegister.Request, AccountRegister.Response>(
      AccountRegister.topic,
      authRegister2Alari
    );
    expect(res.email).toEqual(authRegister2Alari.email);
  });

  it('Login', async () => {
    //console.log(`it('Login', async () => {`)
    const res = await rmqService.triggerRoute<AccountLogin.Request, AccountLogin.Response>(
      AccountLogin.topic,
      authLoginAlari
    );
    //console.log(res)
    //console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.access_token).toBeDefined();
    //await userRepository.deleteUser(authRegister.email);
  });


  it('Login2', async () => {
    //console.log(`it('Login', async () => {`)
    const res = await rmqService.triggerRoute<AccountLogin.Request, AccountLogin.Response>(
      AccountLogin.topic,
      authLogin2Alari
    );
    //console.log(res)
    //console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.access_token).toBeDefined();
    //await userRepository.deleteUser(authRegister.email);
  });

  it('Login3', async () => {
    //console.log(`it('Login', async () => {`)
    const res = await rmqService.triggerRoute<AccountLogin.Request, AccountLogin.Response>(
      AccountLogin.topic,
      authLogin2Alari
    );
    //console.log(res)
    //console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.access_token).toBeDefined();
    //await userRepository.deleteUser(authRegister.email);
  });

  it('LoginTest', async () => {
    //console.log(`it('Login', async () => {`)
    const res = await rmqService.triggerRoute<AccountLoginTest.Request, AccountLoginTest.Response>(
      AccountLoginTest.topic,
      authLogin2Alari
    );
    //console.log(res)
    //console.log('____')
    //console.log(userRepository)
    //await userRepository.deleteUser(authRegister.email);
    expect(res.access_token).toBeDefined();
    //await userRepository.deleteUser(authRegister.email);
  });


  afterAll(async () => {
    //console.log('afterAll(async() => {')
    //await userRepositoryAlari.deleteUser(authRegisterAlari.email);
    //await userRepositoryAlari.deleteUser(authRegister2Alari.email);

    await userService.delete(authRegisterAlari.email);
    await userService.delete(authRegister2Alari.email);

    //const res = await userRepository.deleteUser(authRegister.email);
    //console.log(`afterAll(async ()  => {  await userRepository.deleteUser(authRegister.email);`)
    //console.log(res)

    await app.close();
  });
});