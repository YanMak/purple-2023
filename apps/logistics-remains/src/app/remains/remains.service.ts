import { LogisticsRemains_RemainsEventEmitter } from './remains.event-emitter';
import { LogisticsRemains_WarehouseRepository } from '../repositories/warehouse.repository';
import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class LogisticsRemains_RemainsService {
  constructor(
    private readonly userRepository: LogisticsRemains_WarehouseRepository,
    private readonly rmqService: RMQService,
    private readonly remainsEventEmitter: LogisticsRemains_RemainsEventEmitter
  ) {}
}
