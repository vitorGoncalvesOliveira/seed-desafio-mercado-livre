import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { Cripto } from '../user/cripto';
import { JwtService } from '@nestjs/jwt';

interface userLogin {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: userLogin): Promise<Omit<User, 'password'>> {
    const userToValidate = await this.userService.findOne(user.email);
    if (await Cripto.comparePassword(user.password, userToValidate.password)) {
      const { password, ...userData } = userToValidate;
      return userData;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
