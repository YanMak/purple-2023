import { Module } from '@nestjs/common';
//import { AuthService } from './auth.service';
//import { UserModule } from '../user/user.module';
//import { JwtModule } from '@nestjs/jwt';
//import { getJwtConfig } from '../configs/jwt.config';
import { AuthControllerTest } from './auth-test.controller';
//import { AuthController } from './auth.controller';

@Module({
	imports: [],
	controllers: [AuthControllerTest],
	providers: []
})
export class AuthTestModule { }