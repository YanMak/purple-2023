import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class LogisticsRemains_RemainsEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  async handle() {}
}
