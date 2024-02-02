import { Body, HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../database/entities/user.entity";
import { Repository } from "typeorm";
import { Address } from "../../database/entities/address.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const address = await this.addressRepository.findOneBy({id: 1});

    const user = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.address = address;

    //await this.addressRepository.save(address);

    return this.usersRepository.save(user);
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
    const user = await this.usersRepository.findOneBy({ username });

    return user;
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
