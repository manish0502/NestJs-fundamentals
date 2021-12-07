import { Controller ,Get, Post ,Body, Param} from '@nestjs/common';

@Controller('messages')
export class MessagesController {


// http://localhost:3000/messages

 @Get()
 listMessages(){
     return 'Here is the List of Messages'
 }


// http://localhost:3000/messages

 @Post()
 createMessage(@Body() body:any){
     console.log(body)
 }


// http://localhost:3000/messages/2

 @Get('/:id')
 getMessage(@Param('id') id:string){

    console.log(id)
 }
 


}
