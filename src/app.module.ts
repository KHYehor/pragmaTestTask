import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Web3Module } from './web3/web3.module';
import { EthModule } from './eth/eth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import config from './config/config';
import {Group} from "./entity/Group";
import {Index} from "./entity";
import {GroupsIndexes} from "./entity/GroupsIndexes";
import {LastBlock} from "./entity/LastBlock";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    Web3Module,
    EthModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: ['./env/.env'],
    })],
})
export class AppModule {}
