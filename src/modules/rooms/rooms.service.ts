import { Body, HttpException, Injectable } from "@nestjs/common";
import { CreateRoomsDto } from "./dto/create-rooms.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../../database/entities/room.entity";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(@Body() dto: CreateRoomsDto) {
    return this.roomRepository.save(dto);
  }

  async findAll() {
    return this.roomRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOneBy({ id });

    if (!room) throw new HttpException("Room not found", 400);
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);

    room.name = updateRoomDto.name;

    return this.roomRepository.save(room);
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    await this.roomRepository.delete(room);

    return {success: true}
  }
}
