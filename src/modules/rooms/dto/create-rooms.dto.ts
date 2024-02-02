import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoomsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}
