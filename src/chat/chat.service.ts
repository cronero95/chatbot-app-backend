import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Message, RequestBody, Role } from './interfaces/request-body.interface';
import { configMessage } from './initial-config';
import { ChatResponse } from './interfaces/request-response.interface';

@Injectable()
export class ChatService {
    private messagesHistory: Message[] = [...configMessage];

    private requestMessage: RequestBody = {
        model:       "pai-001",
        prompt:      "Human: Hello\\nAI:",
        temperature: 0.5,
        max_tokens:  256,
        stop:        ["Human:", "AI:"],
        messages:    this.messagesHistory,
    }

    private readonly apiKey: string = process.env.CHAT_AI_API_KEY;
    private readonly apiUrl: string = process.env.CHAT_AI_URL;

    constructor(
        
    ) {}
    
    async sendMessage(messageDto: MessageDto) {
        const {content} = messageDto;

        this.messagesHistory.push({role: Role.User, content});
        console.log(messageDto.content);
        console.log(this.apiUrl);

        const initializer = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(this.requestMessage),
        };

        const resp = await fetch(this.apiUrl, initializer);
        const data: ChatResponse = await resp.json();

        return data.choices[0].message;
    }
}
