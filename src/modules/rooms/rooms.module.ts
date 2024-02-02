import { Module } from '@nestjs/common';
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "../../database/entities/room.entity";
import { Book } from "../../database/entities/book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Room, Book])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
