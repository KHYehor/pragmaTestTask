import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EthService } from "./eth.service";

@Controller('eth')
export class EthController {
  constructor(
    private configService: ConfigService,
    private ethService: EthService,
  ) {}

  @Get('group-ids')
  async getGroupIds() {
    return this.ethService.getGroupIds();
  }

  @Get('group/:groupId')
  async getGroup(@Param() { groupId }) {
    return this.ethService.getGroupById(groupId);
  }

  @Get('index/:indexId')
  async getIndex(@Param() { indexId }) {
    return this.ethService.getIndexById(indexId);
  }

  @Get('last-block')
  async getLastBlock() {
    console.log('here?');
    return this.ethService.getLastBlock();
  }

}
