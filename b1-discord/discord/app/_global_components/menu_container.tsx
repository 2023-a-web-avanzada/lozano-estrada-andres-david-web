// ../discord/app/_global_components/menu_container.tsx

'use client'

import { useEffect, useState } from "react";
import { MenuContextObject } from "@/app/_interfaces/menu_context_object";
import { ContextContainer } from "@/app/_context/context_container";
import ServersMenu from "@/app/_global_components/servers_menu.component";

import { usePathname } from 'next/navigation';

export default function MenuContainer() {
    const currentPath = usePathname();
    const currentChannel = currentPath.split("/")[2];

    // ===== USE STATES =====
    const [selectedItemName, setSelectedItemName] = useState(currentChannel);

    const menuContextObject: MenuContextObject = {
        selectedItemName,
        setSelectedItemName,
    };

    return (
        <>
            <ContextContainer.Provider value={ menuContextObject }>
                <ServersMenu/>
            </ContextContainer.Provider>
        </>
    )
}