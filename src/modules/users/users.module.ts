import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from "../../database/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../../database/entities/address.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
