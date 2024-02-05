import { Body, HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../database/entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "../../database/entities/role.entity";
import { Role as RoleEnum } from "../../common/guards/role.enum";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async registerUser(@Body() createUserDto: CreateUserDto) {
    let user = await this.usersRepository.findOneBy({username: createUserDto.username});
    if (user) throw new HttpException("User already registered", 400);

    user = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(createUserDto.password, salt);

    user.role = await this.roleRepository.findOneBy({ name: RoleEnum.User });

    await this.usersRepository.save(user);

    return {
      success: true
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
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

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user);

    return {success: true}
  }
}
