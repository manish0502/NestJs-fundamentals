import { Body ,Controller  ,Post ,Get} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';


@Controller('auth')
export class UsersController {


    //http://localhost:3000/auth/signup
    
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
         console.log(body)
    }
}
