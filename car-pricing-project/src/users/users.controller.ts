import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  //http://localhost:3000/auth/signup

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  //http://localhost:3000/auth/3

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  //http://localhost:3000/auth?email=AbhiGiri@gmail.com

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
