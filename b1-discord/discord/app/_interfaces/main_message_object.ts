// ../discord/app/_interfaces/main_message_object.ts

import {SimpleMessageObject} from "@/app/_interfaces/simple_message_object";

export interface MainMessageObject {
    "userName": string,
    "userPhotoPath": string,
    "messageDate": string,
    "message": string,
    "simpleMessages": Array<SimpleMessageObject>
}