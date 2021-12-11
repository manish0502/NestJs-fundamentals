import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  Session,
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


  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }

 
  //http://localhost:3000/auth/signout

  @Post('/signout')
   signOut(@Session() session: any) {
    session.userId = null;
    console.log('Signout')
  }


  //http://localhost:3000/auth/signup

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto ,@Session() session: Record<string, any>) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
 

  //http://localhost:3000/auth/signin

  @Post('/signin')
  async logUser(@Body() body: CreateUserDto ,@Session() session: Record<string, any>) {
   const user = await this.authService.signin(body.email, body.password);
   session.userId = user.id;
   return user;
   
  }


  // @Post('/signin')
  // async logUser(@Body() body: CreateUserDto ,@Session() session: any) {
  //  const user = await this.authService.signin(body.email, body.password);
  //  session.userId = user.id;
  //  return user;
  //   //console.log('signin')
  // }

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
