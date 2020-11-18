import {
  Column,
  Entity,
  Index as index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupsIndexes } from "./GroupsIndexes";

@index("id", ["id"], { unique: true })
@Entity("Index", { schema: "Pragma" })
export class Index {
  @PrimaryGeneratedColumn({ type: "int", name: "index_id" })
  indexId: number;

  @Column("int", { name: "id", unique: true })
  id: number;

  @Column("char", { name: "name", length: 64 })
  name: string;

  @Column("char", { name: "ethPriceInWei", length: 64 })
  ethPriceInWei: string;

  @Column("char", { name: "usdPriceInCents", length: 64 })
  usdPriceInCents: string;

  @Column("char", { name: "usdCapitalization", length: 64 })
  usdCapitalization: string;

  @Column("char", { name: "percentageChange", length: 64 })
  percentageChange: string;

  @OneToMany(() => GroupsIndexes, (groupsIndexes) => groupsIndexes.index)
  groupsIndexes: GroupsIndexes[];
}
