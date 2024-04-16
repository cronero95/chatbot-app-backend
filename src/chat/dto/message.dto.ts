import { IsString, MinLength } from "class-validator";

export class MessageDto {
    @IsString()
    @MinLength(2)
    content: string;
}