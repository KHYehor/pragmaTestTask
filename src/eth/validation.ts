import { IsNumberString } from 'class-validator';

export class GroupId {
  @IsNumberString()
  groupId: string;
}

export class IndexId {
  @IsNumberString()
  indexId: string;
}
