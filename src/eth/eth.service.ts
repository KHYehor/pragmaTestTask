import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {Raw, Repository} from "typeorm";

import { Cache } from 'cache-manager';
import { Web3Service } from "../web3/web3.service";

import { Group } from "../entity/Group";
import { Index } from "../entity";
import { GroupsIndexes } from "../entity/GroupsIndexes";
import { LastBlock } from "../entity/LastBlock";

import { IIndex } from "../common/interfaces";
import {IGroup} from "../common/interfaces/group";

@Injectable()
export class EthService {
  constructor(
    private web3Service: Web3Service,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Index)
    private indexRepository: Repository<Index>,
    @InjectRepository(GroupsIndexes)
    private groupsIndexesRepository: Repository<GroupsIndexes>,
    @InjectRepository(LastBlock)
    private lastBlockRepository: Repository<LastBlock>,
  ) {}

  // Get groups ids
  async getGroupIds() {
    const cachedGroupsIds = await this.cacheManager.get('groupIds');
    if (cachedGroupsIds) {
      return cachedGroupsIds;
    }
    const groupsIds = await this.web3Service.getGroupsIds();
    await this.cacheManager.set('groupIds', groupsIds, 60);
    return groupsIds;
  }

  // Get concrete group by id
  async getGroupById(id: string) {
    const cachedGroup = await this.cacheManager.get(`group-${id}`);
    // Picking from cache
    if (cachedGroup) {
      return cachedGroup;
    }

    let group: IGroup;
    try {
      group = await this.web3Service.getGroup(id);
    } catch (err) {
      if (err.message === `Returned error: execution reverted: Invalid group id`) {
        return 'not_found';
      }
      throw err;
    }
    // Saving to Cache
    await this.cacheManager.set(
      `group-${id}`,
      { name: group.name, indexes: group.indexes },
      60
    );
    // Saving to DB
    await this.saveIntoDBgetGroupById(id, group);

    return { name: group.name, indexes: group.indexes };
  }

  // helper function for saving into DB
  // It looks difficult, some failed with this
  private async saveIntoDBgetGroupById(id: string, group: IGroup) {
    const groupDB = this.groupRepository.create({
      id: Number(id),
      name: group.name
    });
    const ifExists = await this.groupRepository.findOne({ id: Number(id) });
    if (!ifExists) {
      await this.groupRepository.save(groupDB);
    }

    // Add also check for relations
    const existingRelations = await this.groupsIndexesRepository.find({
      select: ['indexId'],
      where: {
        groupId: Number(id),
        indexId: Raw(alias =>`${alias} IN (:...indexes_ids)`, { indexes_ids: group.indexes })
      }
    });
    const existingMapped = existingRelations.map(item => item.indexId);
    // Find relations that doesn't exist
    const difference = group.indexes.filter(x => !existingMapped.includes(Number(x)));
    if (difference.length) {
      // Find indexies that exists
      const indexes = await this.indexRepository.find({
        id: Raw(alias =>`${alias} IN (:...difference)`, { difference: difference.map(el => Number(el)) })
      });
      if (!indexes) return;
      const indexesDB = indexes.map(indexId =>
        this.groupsIndexesRepository.create({ groupId: Number(id), indexId: indexId.id })
      );
      await this.groupsIndexesRepository.save(indexesDB);

    }
  }

  // Getting index by Id
  async getIndexById(id: string) {
    const cachedIndex = await this.cacheManager.get(`index-${id}`);
    // Picking from cache
    if (cachedIndex) {
      return cachedIndex;
    }

    let index: IIndex;
    try {
      index = await this.web3Service.getIndex(id);
    } catch (err) {
      if (err.message === `Returned error: execution reverted: Invalid index id`) {
        return 'not_found';
      }
      throw err;
    }

    // Saving to cache
    await this.cacheManager.set(
      `index-${id}`,
      {
        name: index.name,
        ethPriceInWei: index.ethPriceInWei,
        usdPriceInCents: index.usdPriceInCents,
        usdCapitalization: index.usdCapitalization,
        percentageChange: index.percentageChange,
      },
      60
    );
    // Saving to DB
    await this.saveToDBgetIndexById(id, index);

    return {
      name: index.name,
      ethPriceInWei: index.ethPriceInWei,
      usdPriceInCents: index.usdPriceInCents,
      usdCapitalization: index.usdCapitalization,
      percentageChange: index.percentageChange,
    }
  }

  // helper function for saving into DB
  private async saveToDBgetIndexById(id: string, index: IIndex) {
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

  // get last blockchain block
  async getLastBlock() {
    const lastBlock: object = await this.web3Service.getLastBlock();
    // Saving to DB
    await this.saveTODBgetLastBlock(lastBlock);

    return lastBlock;
  }

  // helper function for saving into DB
  private async saveTODBgetLastBlock(lastBlock: object) {
    const lastBlockDB = this.lastBlockRepository.create({ block: lastBlock });
    await this.lastBlockRepository.save<LastBlock>(lastBlockDB);
  }
}
