import { UserResponse } from "./user-response.model";

export interface Message{
    messageType: string,
    sender: number, 
    content: string,
    table: string,
    storyPoint? : string
    issue? : string
}