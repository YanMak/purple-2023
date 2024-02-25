import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { HttpModule } from '@nestjs/axios';
import { LoymaxModule } from './loymax/loymax.module';

@Module({
  imports: [HttpModule, LoymaxModule],
  providers: [LoyaltyService],
  controllers: [LoyaltyController],
})
export class LoyaltyModule {}
