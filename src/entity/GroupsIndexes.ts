import {
  Column,
  Entity,
  Index as index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./Group";
import { Index } from "./Index";

@index("group_id", ["groupId"], {})
@index("index_id", ["indexId"], {})
@Entity("groups_indexes", { schema: "Pragma" })
export class GroupsIndexes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "group_id" })
  groupId: number;

  @Column("int", { name: "index_id" })
  indexId: number;

  @ManyToOne(() => Group, (group) => group.groupsIndexes, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "group_id", referencedColumnName: "id" }])
  group: Group;

  @ManyToOne(() => Index, (index) => index.groupsIndexes, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "index_id", referencedColumnName: "id" }])
  index: Index;
}
