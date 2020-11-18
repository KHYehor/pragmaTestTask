import { ConfigService } from '@nestjs/config';
import { EthService } from "./eth.service";
export declare class EthController {
    private configService;
    private ethService;
    constructor(configService: ConfigService, ethService: EthService);
    getGroupIds(): Promise<any>;
    getGroup({ groupId }: {
        groupId: any;
    }): Promise<any>;
    getIndex({ indexId }: {
        indexId: any;
    }): Promise<any>;
    getLastBlock(): Promise<object>;
}
