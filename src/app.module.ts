import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./database/ormconfig";
import { AuthModule } from "./modules/auth/auth.module";
import { RoleModule } from "./modules/role/role.module";
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    RoomsModule,
    AuthModule,
    RoleModule,
    BooksModule
  ]
})
export class AppModule {}
