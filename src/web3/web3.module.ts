import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import {ConfigService} from "@nestjs/config";

@Module({
  providers: [Web3Service, ConfigService],
})
export class Web3Module {}
