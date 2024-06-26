// Generated by https://quicktype.io

import { Message } from "./request-body.interface";

export interface ChatResponse {
    id:      string;
    created: number;
    model:   string;
    object:  string;
    choices: Choice[];
    usage:   Usage;
}

export interface Choice {
    finish_reason: string;
    index:         number;
    message:       Message;
}

interface Usage {
    prompt_tokens:     number;
    completion_tokens: number;
    total_tokens:      number;
}

export interface ResponseTime {
    hour: number;
    minute: number;
}

export interface UserResponse {
    message: Message;
    time: ResponseTime;
}