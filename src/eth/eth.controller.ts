import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EthService } from "./eth.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('eth')
export class EthController {
  constructor(
    private configService: ConfigService,
    private ethService: EthService,
  ) {}

  @ApiOperation({ description: "Get all existing groups' ids" })
  @ApiResponse({ status: 200, description: "Wrong id", type: Object })
  @ApiResponse({ status: 200, description: "Array of ids", type: String, isArray: true })
  @Get('group-ids')
  async getGroupIds() {
    return this.ethService.getGroupIds();
  }

  @ApiOperation({ description: "Get group detail description" })
  @ApiResponse({ status: 200, description: "Wrong id", type: Object })
  @ApiResponse({ status: 404, description: "Wrong id", type: String })
  @Get('group/:groupId')
  async getGroup(@Param() { groupId }) {
    const result = await this.ethService.getGroupById(groupId);
    if (result === 'not_found') {
      throw new HttpException('NOT_FOUND', 404);
    }
    return result;
  }

  @ApiOperation({ description: "Get index detail description" })
  @ApiResponse({ status: 404, description: "Wrong id", type: String })
  @Get('index/:indexId')
  async getIndex(@Param() { indexId }) {
    const result = await this.ethService.getIndexById(indexId);
    if (result === 'not_found') {
      throw new HttpException('NOT_FOUND', 404);
    }
    return result;
  }

  @ApiOperation({ description: "Get last blockchain structure" })
  @ApiResponse({ status: 200, description: "Array of ids", type: Object, isArray: true })
  @Get('last-block')
  async getLastBlock() {
    return this.ethService.getLastBlock();
  }

}
