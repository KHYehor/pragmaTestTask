import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EthService } from "./eth.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import { GroupId, IndexId } from './validation';

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
  async getGroup(@Param() param: GroupId) {
    if (isNaN(Number(param.groupId)) || !param.groupId.length) {
      throw new HttpException('Number was expected', 401);
    }
    const result = await this.ethService.getGroupById(param.groupId);
    if (result === 'not_found') {
      throw new HttpException('NOT_FOUND', 404);
    }
    return result;
  }

  @ApiOperation({ description: "Get index detail description" })
  @ApiResponse({ status: 404, description: "Wrong id", type: String })
  @Get('index/:indexId')
  async getIndex(@Param() param: IndexId) {
    if (isNaN(Number(param.indexId)) || !param.indexId.length) {
      throw new HttpException('Number was expected', 401);
    }
    const result = await this.ethService.getIndexById(param.indexId);
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
