import { ConfigService } from '@nestjs/config';
import { EthService } from "./eth.service";
import { GroupId, IndexId } from './validation';
export declare class EthController {
    private configService;
    private ethService;
    constructor(configService: ConfigService, ethService: EthService);
    getGroupIds(): Promise<any>;
    getGroup(param: GroupId): Promise<any>;
    getIndex(param: IndexId): Promise<any>;
    getLastBlock(): Promise<object>;
}
