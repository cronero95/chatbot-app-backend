import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Message, RequestBody, Role } from './interfaces/request-body.interface';
import { configMessage } from './initial-config';
import { ChatResponse, ResponseTime, UserResponse } from './interfaces/request-response.interface';

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

    private responseMessage: Message;
    private responseTime: ResponseTime;
    private userResponse: UserResponse;

    private readonly apiKey: string = process.env.CHAT_AI_API_KEY;
    private readonly apiUrl: string = process.env.CHAT_AI_URL;

    constructor(
        
    ) {}
    
    async sendMessage(messageDto: MessageDto) {
        const {content} = messageDto;

        this.messagesHistory.push({role: Role.User, content});

        const initializer = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(this.requestMessage),
        };

        try {

            const resp = await fetch(this.apiUrl, initializer);
            const data: ChatResponse = await resp.json();

            this.responseMessage = data.choices[0].message;

            const currentTime = new Date();
            this.responseTime = {
                hour: currentTime.getHours(),
                minute: currentTime.getMinutes(),
            };

            this.messagesHistory.push(this.responseMessage);

            this.userResponse = {
                message: this.responseMessage,
                time: this.responseTime,
            };

            return this.userResponse;

        } catch {
            throw new BadRequestException('Something went wrong. Check for the API key and API URL.');
        }
    }

    deleteHistory(): void {
        this.messagesHistory = [...configMessage];
        this.requestMessage = {
            model:       "pai-001",
            prompt:      "Human: Hello\\nAI:",
            temperature: 0.5,
            max_tokens:  256,
            stop:        ["Human:", "AI:"],
            messages:    this.messagesHistory,
        };
    }
}
