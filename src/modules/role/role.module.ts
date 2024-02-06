import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "../../database/entities/role.entity";
import { RoleService } from "./role.service";
import { RoleRepository } from "./role.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, RoleRepository],
  exports: [RoleService]
})
export class RoleModule {}