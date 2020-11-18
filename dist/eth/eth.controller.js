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
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const eth_service_1 = require("./eth.service");
let EthController = class EthController {
    constructor(configService, ethService) {
        this.configService = configService;
        this.ethService = ethService;
    }
    async getGroupIds() {
        return this.ethService.getGroupIds();
    }
    async getGroup({ groupId }) {
        return this.ethService.getGroupById(groupId);
    }
    async getIndex({ indexId }) {
        return this.ethService.getIndexById(indexId);
    }
    async getLastBlock() {
        console.log('here?');
        return this.ethService.getLastBlock();
    }
};
__decorate([
    common_1.Get('group-ids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EthController.prototype, "getGroupIds", null);
__decorate([
    common_1.Get('group/:groupId'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EthController.prototype, "getGroup", null);
__decorate([
    common_1.Get('index/:indexId'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EthController.prototype, "getIndex", null);
__decorate([
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
exports.EthController = EthController;
//# sourceMappingURL=eth.controller.js.map