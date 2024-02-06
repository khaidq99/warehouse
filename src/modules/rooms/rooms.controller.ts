import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomsDto } from "./dto/create-rooms.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { IPaginationOptions } from "nestjs-typeorm-paginate";

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomsDto: CreateRoomsDto) {
    return this.roomsService.create(createRoomsDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ) {
    const options: IPaginationOptions = {
      limit,
      page
    }
    return this.roomsService.paginate(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.remove(id);
  }
}
