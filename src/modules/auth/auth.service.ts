import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) throw new HttpException("Invalid username or password", 400);

    const validPassword = await bcrypt.compare(pass, user.password);
    if (!validPassword) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username, role: user.role.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
