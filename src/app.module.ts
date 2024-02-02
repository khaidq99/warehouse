import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./database/ormconfig";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule, RoomsModule, AuthModule
  ]
})
export class AppModule {}
