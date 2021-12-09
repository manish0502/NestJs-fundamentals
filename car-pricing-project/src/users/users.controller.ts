import { Body ,Controller  ,Post ,Get} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service'

@Controller('auth')
export class UsersController {


    constructor(private userService: UsersService){}


    //http://localhost:3000/auth/signup
    
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
         this.userService.create(body.email , body.password)
    }
}
