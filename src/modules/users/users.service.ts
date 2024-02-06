import { Body, HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "../../database/entities/user.entity";
import * as bcrypt from "bcrypt";
import { UserRepository } from "./users.repository";
import { RoleService } from "../role/role.service";
import { ERole } from "../../enums/role.enum";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserRepository,

    private roleService: RoleService,
  ) {}

  async registerUser(@Body() createUserDto: CreateUserDto) {
    let user = await this.usersRepository.findOneBy({username: createUserDto.username});
    if (user) throw new HttpException("User already registered", 400);

    user = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(createUserDto.password, salt);

    user.role = await this.roleService.getRole(ERole.User);

    await this.usersRepository.save(user);

    return {
      success: true
    }
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('u');
    queryBuilder.orderBy('u.name', 'DESC');
    queryBuilder.select(['u.id', 'u.username', 'u.name']);

    return paginate<User>(queryBuilder, options);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new HttpException("User not found", 400);
    return user;
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne(
      {
        relations: ['role'],
        where: {
          'username': username
        },
      }
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    user.name = updateUserDto.name;

    const updatedUser =  await this.usersRepository.save(user);
    const responseUser = { ...updatedUser };
    delete responseUser.password;

    return responseUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user);

    return {
      success: true
    }
  }
}
