import { ConfigService } from "@nestjs/config";
import { IIndex } from "../common/interfaces";
import { IGroup } from "../common/interfaces/group";
export declare class Web3Service {
    private configService;
    private ETH;
    private PragmaContract;
    constructor(configService: ConfigService);
    getGroupsIds(): Promise<string[]>;
    getIndex(id: string): Promise<IIndex>;
    getGroup(id: string): Promise<IGroup>;
    getLastBlock(): Promise<object>;
}
