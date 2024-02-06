import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { BookRepository } from "./book.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../../database/entities/book.entity";
import { RoomsModule } from "../rooms/rooms.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    RoomsModule
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class BooksModule {}
