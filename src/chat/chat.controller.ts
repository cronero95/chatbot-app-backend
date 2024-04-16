import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) {}

    @Post()
    sendMessage(@Body() messageDto: MessageDto) {
        return this.chatService.sendMessage(messageDto);
    }

    @Delete()
    deleteHistory() {
        this.chatService.deleteHistory();
    }
}
