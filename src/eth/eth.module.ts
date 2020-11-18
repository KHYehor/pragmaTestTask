import {CacheModule, Module} from '@nestjs/common';
import { EthService } from './eth.service';
import { EthController } from './eth.controller';
import { Web3Service } from "../web3/web3.service";
import { ConfigService } from "@nestjs/config";

import { Group } from "../entity/Group";
import { Index } from "../entity/Index";
import { GroupsIndexes } from "../entity/GroupsIndexes";
import { LastBlock } from "../entity/LastBlock";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Group, Index, GroupsIndexes, LastBlock]),
  ],
  controllers: [EthController],
  providers: [EthService, Web3Service, ConfigService],
})
export class EthModule {}
