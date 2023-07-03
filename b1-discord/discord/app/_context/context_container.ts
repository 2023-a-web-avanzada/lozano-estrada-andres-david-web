// ../discord/app/_context/context_container.ts

import { MenuContextObject } from "@/app/_interfaces/menu_context_object";
import { createContext } from "react";

export const ContextContainer = createContext(
    {} as MenuContextObject
)