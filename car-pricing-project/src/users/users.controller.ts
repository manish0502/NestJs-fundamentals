import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dtos/user.dto'
 
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService , private authService:AuthService) {}

  //http://localhost:3000/auth/signup

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.authService.signup(body.email, body.password);
  }

  //http://localhost:3000/auth/3
  // @UseInterceptors(new SerializeInterceptor(UserDto))
 
  @Get('/:id')
  async findUser(@Param('id') id: string) {

    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  //http://localhost:3000/auth?email=AbhiGiri@gmail.com

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  //http://localhost:3000/auth/14

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  //http://localhost:3000/auth/17

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
