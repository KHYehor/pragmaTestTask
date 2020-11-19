"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const eth_service_1 = require("./eth.service");
const swagger_1 = require("@nestjs/swagger");
const validation_1 = require("./validation");
let EthController = (() => {
    let EthController = class EthController {
        constructor(configService, ethService) {
            this.configService = configService;
            this.ethService = ethService;
        }
        async getGroupIds() {
            return this.ethService.getGroupIds();
        }
        async getGroup(param) {
            if (isNaN(Number(param.groupId)) || !param.groupId.length) {
                throw new common_1.HttpException('Number was expected', 401);
            }
            const result = await this.ethService.getGroupById(param.groupId);
            if (result === 'not_found') {
                throw new common_1.HttpException('NOT_FOUND', 404);
            }
            return result;
        }
        async getIndex(param) {
            if (isNaN(Number(param.indexId)) || !param.indexId.length) {
                throw new common_1.HttpException('Number was expected', 401);
            }
            const result = await this.ethService.getIndexById(param.indexId);
            if (result === 'not_found') {
                throw new common_1.HttpException('NOT_FOUND', 404);
            }
            return result;
        }
        async getLastBlock() {
            return this.ethService.getLastBlock();
        }
    };
    __decorate([
        swagger_1.ApiOperation({ description: "Get all existing groups' ids" }),
        swagger_1.ApiResponse({ status: 200, description: "Wrong id", type: Object }),
        swagger_1.ApiResponse({ status: 200, description: "Array of ids", type: String, isArray: true }),
        common_1.Get('group-ids'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], EthController.prototype, "getGroupIds", null);
    __decorate([
        swagger_1.ApiOperation({ description: "Get group detail description" }),
        swagger_1.ApiResponse({ status: 200, description: "Wrong id", type: Object }),
        swagger_1.ApiResponse({ status: 404, description: "Wrong id", type: String }),
        common_1.Get('group/:groupId'),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [validation_1.GroupId]),
        __metadata("design:returntype", Promise)
    ], EthController.prototype, "getGroup", null);
    __decorate([
        swagger_1.ApiOperation({ description: "Get index detail description" }),
        swagger_1.ApiResponse({ status: 404, description: "Wrong id", type: String }),
        common_1.Get('index/:indexId'),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [validation_1.IndexId]),
        __metadata("design:returntype", Promise)
    ], EthController.prototype, "getIndex", null);
    __decorate([
        swagger_1.ApiOperation({ description: "Get last blockchain structure" }),
        swagger_1.ApiResponse({ status: 200, description: "Array of ids", type: Object, isArray: true }),
        common_1.Get('last-block'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], EthController.prototype, "getLastBlock", null);
    EthController = __decorate([
        common_1.Controller('eth'),
        __metadata("design:paramtypes", [config_1.ConfigService,
            eth_service_1.EthService])
    ], EthController);
    return EthController;
})();
exports.EthController = EthController;
//# sourceMappingURL=eth.controller.js.map