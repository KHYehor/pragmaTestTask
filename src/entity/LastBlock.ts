import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("LastBlock", { schema: "Pragma" })
export class LastBlock {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("json", { name: "block" })
  block: object;
}
