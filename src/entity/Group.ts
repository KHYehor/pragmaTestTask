import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupsIndexes } from "./GroupsIndexes";

@Index("id", ["id"], { unique: true })
@Entity("Group", { schema: "Pragma" })
export class Group {
  @PrimaryGeneratedColumn({ type: "int", name: "group_id" })
  groupId: number;

  @Column("int", { name: "id", unique: true })
  id: number;

  @Column("char", { name: "name", length: 64 })
  name: string;

  @OneToMany(() => GroupsIndexes, (groupsIndexes) => groupsIndexes.group)
  groupsIndexes: GroupsIndexes[];
}
