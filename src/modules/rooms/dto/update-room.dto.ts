import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomsDto } from './create-rooms.dto';

export class UpdateRoomDto extends PartialType(CreateRoomsDto) {}
