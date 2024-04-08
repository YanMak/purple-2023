import { Controller } from '@nestjs/common';
import { LogisticsRemains_RemainsService } from './remains.service';
import { RMQRoute, RMQService } from 'nestjs-rmq';

@Controller()
export class LogisticsRemains_RemainsCommands {
  constructor(
    private readonly remainsService: LogisticsRemains_RemainsService,
    private readonly rmqService: RMQService
  ) {}

  @RMQRoute('LogisticsRemains.commands.topic')
  async command(): Promise<void> {
  }
}
