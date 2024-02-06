import { HttpException, Injectable } from "@nestjs/common";
import { RoleRepository } from "./role.repository";
import { ERole } from "../../enums/role.enum";

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository
  ) {}


  async getRole(roleName: ERole) {
    const role = await this.roleRepository.findOneBy({ name: ERole.User });

    if (!role) throw new HttpException("Role not found", 400);
    return role;
  }
}