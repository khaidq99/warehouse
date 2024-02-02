import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column()
  street: string;
}
