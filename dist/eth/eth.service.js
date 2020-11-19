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
exports.EthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const web3_service_1 = require("../web3/web3.service");
const Group_1 = require("../entity/Group");
const entity_1 = require("../entity");
const GroupsIndexes_1 = require("../entity/GroupsIndexes");
const LastBlock_1 = require("../entity/LastBlock");
let EthService = (() => {
    let EthService = class EthService {
        constructor(web3Service, cacheManager, groupRepository, indexRepository, groupsIndexesRepository, lastBlockRepository) {
            this.web3Service = web3Service;
            this.cacheManager = cacheManager;
            this.groupRepository = groupRepository;
            this.indexRepository = indexRepository;
            this.groupsIndexesRepository = groupsIndexesRepository;
            this.lastBlockRepository = lastBlockRepository;
        }
        async getGroupIds() {
            const cachedGroupsIds = await this.cacheManager.get('groupIds');
            if (cachedGroupsIds) {
                return cachedGroupsIds;
            }
            const groupsIds = await this.web3Service.getGroupsIds();
            await this.cacheManager.set('groupIds', groupsIds, 60);
            return groupsIds;
        }
        async getGroupById(id) {
            const cachedGroup = await this.cacheManager.get(`group-${id}`);
            if (cachedGroup) {
                return cachedGroup;
            }
            let group;
            try {
                group = await this.web3Service.getGroup(id);
            }
            catch (err) {
                if (err.message === `Returned error: execution reverted: Invalid group id`) {
                    return 'not_found';
                }
                throw err;
            }
            await this.cacheManager.set(`group-${id}`, { name: group.name, indexes: group.indexes }, 60);
            await this.saveIntoDBgetGroupById(id, group);
            return { name: group.name, indexes: group.indexes };
        }
        async saveIntoDBgetGroupById(id, group) {
            const groupDB = this.groupRepository.create({
                id: Number(id),
                name: group.name
            });
            const ifExists = await this.groupRepository.findOne({ id: Number(id) });
            if (!ifExists) {
                await this.groupRepository.save(groupDB);
            }
            const existingRelations = await this.groupsIndexesRepository.find({
                select: ['indexId'],
                where: {
                    groupId: Number(id),
                    indexId: typeorm_2.Raw(alias => `${alias} IN (:...indexes_ids)`, { indexes_ids: group.indexes })
                }
            });
            const existingMapped = existingRelations.map(item => item.indexId);
            const difference = group.indexes.filter(x => !existingMapped.includes(Number(x)));
            if (difference.length) {
                const indexes = await this.indexRepository.find({
                    id: typeorm_2.Raw(alias => `${alias} IN (:...difference)`, { difference: difference.map(el => Number(el)) })
                });
                if (!indexes)
                    return;
                const indexesDB = indexes.map(indexId => this.groupsIndexesRepository.create({ groupId: Number(id), indexId: indexId.id }));
                await this.groupsIndexesRepository.save(indexesDB);
            }
        }
        async getIndexById(id) {
            const cachedIndex = await this.cacheManager.get(`index-${id}`);
            if (cachedIndex) {
                return cachedIndex;
            }
            let index;
            try {
                index = await this.web3Service.getIndex(id);
            }
            catch (err) {
                if (err.message === `Returned error: execution reverted: Invalid index id`) {
                    return 'not_found';
                }
                throw err;
            }
            await this.cacheManager.set(`index-${id}`, {
                name: index.name,
                ethPriceInWei: index.ethPriceInWei,
                usdPriceInCents: index.usdPriceInCents,
                usdCapitalization: index.usdCapitalization,
                percentageChange: index.percentageChange,
            }, 60);
            await this.saveToDBgetIndexById(id, index);
            return {
                name: index.name,
                ethPriceInWei: index.ethPriceInWei,
                usdPriceInCents: index.usdPriceInCents,
                usdCapitalization: index.usdCapitalization,
                percentageChange: index.percentageChange,
            };
        }
        async saveToDBgetIndexById(id, index) {
            const indexDB = this.indexRepository.create({
                id: Number(id),
                name: index.name,
                ethPriceInWei: index.ethPriceInWei,
                percentageChange: index.percentageChange,
                usdCapitalization: index.usdCapitalization,
                usdPriceInCents: index.usdPriceInCents,
            });
            const ifExists = await this.indexRepository.findOne({ id: Number(id) });
            if (!ifExists) {
                await this.indexRepository.save(indexDB);
            }
        }
        async getLastBlock() {
            const lastBlock = await this.web3Service.getLastBlock();
            await this.saveTODBgetLastBlock(lastBlock);
            return lastBlock;
        }
        async saveTODBgetLastBlock(lastBlock) {
            const lastBlockDB = this.lastBlockRepository.create({ block: lastBlock });
            await this.lastBlockRepository.save(lastBlockDB);
        }
    };
    EthService = __decorate([
        common_1.Injectable(),
        __param(1, common_1.Inject(common_1.CACHE_MANAGER)),
        __param(2, typeorm_1.InjectRepository(Group_1.Group)),
        __param(3, typeorm_1.InjectRepository(entity_1.Index)),
        __param(4, typeorm_1.InjectRepository(GroupsIndexes_1.GroupsIndexes)),
        __param(5, typeorm_1.InjectRepository(LastBlock_1.LastBlock)),
        __metadata("design:paramtypes", [web3_service_1.Web3Service, Object, typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository])
    ], EthService);
    return EthService;
})();
exports.EthService = EthService;
//# sourceMappingURL=eth.service.js.map