import { Controller ,Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {


// http://localhost:3000/messages

 @Get()
 listMessages(){
     return 'Here is the List of Messages'
 }


// http://localhost:3000/messages

 @Post()
 createMessage(){
     return 'Create a Message here'
 }


// http://localhost:3000/messages/2

 @Get('/:id')
 getMessage(){
     return 'Here is the message with ID'
 }
 


}
