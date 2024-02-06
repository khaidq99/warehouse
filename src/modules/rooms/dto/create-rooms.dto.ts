import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoomsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
