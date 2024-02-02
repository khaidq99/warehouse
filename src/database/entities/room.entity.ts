import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Book } from "./book.entity";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column()
  description: string;

  @OneToOne(type => Address)
  @JoinColumn({name: "address_id"})
  address: Address

  @OneToMany(type => Book, book => book.room)
  books: Book[]
}
