import { Controller ,Get, Post ,Body, Param} from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-class.dto'

@Controller('messages')
export class MessagesController {


// http://localhost:3000/messages

 @Get()
 listMessages(){
     return 'Here is the List of Messages'
 }


// http://localhost:3000/messages

 @Post()
 createMessage(@Body() body:CreateMessageDto){
     console.log(body)
 }


 /**if you pass number instaed of string you will get folowing things  in createMessage
  * {
    "statusCode": 400,
    "message": [
        "content must be a string"
    ],
    "error": "Bad Request"
   }
   
 */

// http://localhost:3000/messages/2

 @Get('/:id')
 getMessage(@Param('id') id:string){

    console.log(id)
 }
 


}
