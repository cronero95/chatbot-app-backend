import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
    sendMessage(messageDto: MessageDto) {
        return 'This action send a new message';
    }
}
