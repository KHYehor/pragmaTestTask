"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthModule = void 0;
const common_1 = require("@nestjs/common");
const eth_service_1 = require("./eth.service");
const eth_controller_1 = require("./eth.controller");
const web3_service_1 = require("../web3/web3.service");
const config_1 = require("@nestjs/config");
const Group_1 = require("../entity/Group");
const Index_1 = require("../entity/Index");
const GroupsIndexes_1 = require("../entity/GroupsIndexes");
const LastBlock_1 = require("../entity/LastBlock");
const typeorm_1 = require("@nestjs/typeorm");
let EthModule = (() => {
    let EthModule = class EthModule {
    };
    EthModule = __decorate([
        common_1.Module({
            imports: [
                common_1.CacheModule.register(),
                typeorm_1.TypeOrmModule.forFeature([Group_1.Group, Index_1.Index, GroupsIndexes_1.GroupsIndexes, LastBlock_1.LastBlock]),
            ],
            controllers: [eth_controller_1.EthController],
            providers: [eth_service_1.EthService, web3_service_1.Web3Service, config_1.ConfigService],
        })
    ], EthModule);
    return EthModule;
})();
exports.EthModule = EthModule;
//# sourceMappingURL=eth.module.js.map