import { Body, HttpException, Injectable } from "@nestjs/common";
import { CreateRoomsDto } from "./dto/create-rooms.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { RoomRepository } from "./room.repository";
import { Room } from "../../database/entities/room.entity";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class RoomsService {
  constructor(
    private roomRepository: RoomRepository,
  ) {}

  async create(@Body() dto: CreateRoomsDto) {
    const room = new Room();
    room.name = dto.name;
    return this.roomRepository.save(room);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Room>> {
    const queryBuilder = this.roomRepository.createQueryBuilder('r');
    queryBuilder.orderBy('r.name', 'ASC');

    return paginate<Room>(queryBuilder, options);
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

    return {
      success: true
    }
  }
}
