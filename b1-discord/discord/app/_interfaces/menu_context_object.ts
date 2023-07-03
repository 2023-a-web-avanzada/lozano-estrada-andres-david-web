// ../discord/app/_interfaces/menu_context_object.ts

import { Dispatch, SetStateAction } from "react";

export interface MenuContextObject {
    selectedItemName: string;
    setSelectedItemName: Dispatch<SetStateAction<string>>
}