import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create.user.dto';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private auth: AuthService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<any> {
    return this.userService.create(createUser);
  }
}
