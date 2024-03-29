"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const web3_module_1 = require("./web3/web3.module");
const eth_module_1 = require("./eth/eth.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("./config/config");
const Group_1 = require("./entity/Group");
const Index_1 = require("./entity/Index");
const GroupsIndexes_1 = require("./entity/GroupsIndexes");
const LastBlock_1 = require("./entity/LastBlock");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Group_1.Group, Index_1.Index, GroupsIndexes_1.GroupsIndexes, LastBlock_1.LastBlock]),
            web3_module_1.Web3Module,
            eth_module_1.EthModule,
            config_1.ConfigModule.forRoot({
                load: [config_2.default],
                envFilePath: ['./env/.env'],
            })
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map