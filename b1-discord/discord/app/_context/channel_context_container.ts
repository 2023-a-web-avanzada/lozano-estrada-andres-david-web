// ../discord/app/_context/channel_context_container.ts

import { ChannelContextObject } from "@/app/_interfaces/channel_context_object";
import { createContext } from "react";

export const ChannelContextContainer = createContext(
    {} as ChannelContextObject
)