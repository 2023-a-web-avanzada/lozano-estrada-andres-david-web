// ../discord/app/_interfaces/channel_context_object.ts

import { Dispatch, SetStateAction } from "react";

export interface ChannelContextObject {
    selectedChannel: string;
    setSelectedChannel: Dispatch<SetStateAction<string>>
}