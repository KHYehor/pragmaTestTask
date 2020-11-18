import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
// It was some problems with import
const Eth = require('web3-eth');
import { AbiItem } from 'web3-utils';
import {IIndex} from "../common/interfaces";
import {IGroup} from "../common/interfaces/group";

@Injectable()
export class Web3Service {
  private ETH;
  private PragmaContract;
  constructor(private configService: ConfigService) {
    this.ETH = new Eth(configService.get<string>('ROPSTEN_ADDRESS'));
    // @ts-ignore
    this.PragmaContract = new this.ETH.Contract(
      configService.get<AbiItem[]>('abi'),
      configService.get<string>('CONTRACT_ADDRESS')
    );
  }

  async getGroupsIds(): Promise<string[]> {
    return this.PragmaContract.methods.getGroupIds().call();
  }

  async getIndex(id: string): Promise<IIndex> {
    return this.PragmaContract.methods.getIndex(id).call();
  }

  async getGroup(id: string): Promise<IGroup> {
    return this.PragmaContract.methods.getGroup(id).call();
  }

  async getLastBlock(): Promise<object> {
    const lastBlockNumber = await this.ETH.getBlockNumber();
    return this.ETH.getBlock(lastBlockNumber);
  }
}
