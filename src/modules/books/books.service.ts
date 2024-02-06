import { HttpException, Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookRepository } from "./book.repository";
import { RoomsService } from "../rooms/rooms.service";
import { Book } from "../../database/entities/book.entity";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { createQueryBuilder } from "typeorm";

@Injectable()
export class BooksService {
  constructor(
    private bookRepository: BookRepository,

    private roomService: RoomsService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const room = await this.roomService.findOne(createBookDto.roomId);

    const book = new Book();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.room = room;

    await this.bookRepository.save(book);

    return {
      success: true
    }
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Book>> {
    const queryBuilder = this.bookRepository.createQueryBuilder('b');
    queryBuilder.orderBy('b.name');

    return paginate<Book>(queryBuilder, options);
  }

  async findOne(id: number) {
    const book = await this.bookRepository.createQueryBuilder('b')
      .leftJoinAndSelect("b.room", "r")
      .where("b.id = :id", { id: id })
      .getOne();

    if (!book) throw new HttpException("Book not found", 400);
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const room = await this.roomService.findOne(updateBookDto.roomId);
    const book = await this.findOne(id);

    book.name = updateBookDto.name;
    book.author = updateBookDto.author;
    book.room = room;

    return await this.bookRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    await this.bookRepository.delete(book);

    return {
      success: true
    }
  }
}
