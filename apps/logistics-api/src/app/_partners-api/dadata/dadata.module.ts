import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DadataService } from './dadata.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.dadata.env' }),
  ],
  providers: [DadataService],
  exports: [DadataService],
})
export class DadataModule {}
