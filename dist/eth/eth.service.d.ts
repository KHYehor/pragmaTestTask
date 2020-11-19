import { Repository } from "typeorm";
import { Cache } from 'cache-manager';
import { Web3Service } from "../web3/web3.service";
import { Group } from "../entity/Group";
import { Index } from "../entity";
import { GroupsIndexes } from "../entity/GroupsIndexes";
import { LastBlock } from "../entity/LastBlock";
export declare class EthService {
    private web3Service;
    private cacheManager;
    private groupRepository;
    private indexRepository;
    private groupsIndexesRepository;
    private lastBlockRepository;
    constructor(web3Service: Web3Service, cacheManager: Cache, groupRepository: Repository<Group>, indexRepository: Repository<Index>, groupsIndexesRepository: Repository<GroupsIndexes>, lastBlockRepository: Repository<LastBlock>);
    getGroupIds(): Promise<any>;
    getGroupById(id: string): Promise<any>;
    private saveIntoDBgetGroupById;
    getIndexById(id: string): Promise<any>;
    private saveToDBgetIndexById;
    getLastBlock(): Promise<object>;
    private saveTODBgetLastBlock;
}
