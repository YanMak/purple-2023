import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApishipService } from './apiship.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.apiship.env' }),
  ],
  providers: [ApishipService],
  exports: [ApishipService],
})
export class ApishipModule {}
