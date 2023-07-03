// ../discord/app/_global_components/server_item.component.tsx

'use client'

import React, { useContext, useState } from "react";
import { ContextContainer } from "@/app/_context/context_container";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export type ServerItemProperties = {
    url: string,
    logoPublicPath: string,
    alternativeLogoPath?: string,
    serverName: string,
};

export default function ServerItem(
    properties: ServerItemProperties,
) {
    const { url, logoPublicPath, alternativeLogoPath, serverName, } = properties;
    const contextContainer = useContext(ContextContainer);
    const activeItem = contextContainer.selectedItemName === url;
    const hasAlternativePath = alternativeLogoPath !== undefined;
    const hoverColor = hasAlternativePath ? "[#23a559]" : "[#5865f2]";
    const router = useRouter();

    const itemStyle = {
        width: "72px",
    };

    // ===== USE STATES =====
    const [localLogoPublicPath, setLocalLogoPublicPath] = useState(logoPublicPath);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <li
                className="h-12 w-max flex items-center mb-2"
                style={ itemStyle }
            >
                {/* ===== LATERAL MARK ===== */}
                <div className={
                    `w-1 mr-2 rounded-e-2xl flex flex-col ${ activeItem ? "bg-white h-10" : "h-5" }
                    transition-all duration-150 ease-out`
                }>
                    <div className={
                        `${ isHovered ? "bg-white h-5 w-1 mr-2 rounded-e-2xl" : "bg-white h-0 w-0 mr-2 rounded-e-2xl" }
                        transition-all duration-150 ease-out mt-auto mb-auto`
                    } />
                </div>


                {/* ===== ITEM ICON ===== */}
                <div
                    className={
                        `h-12 w-12 flex items-center justify-center aspect-square rounded-3xl bg-[#313338] 
                        ${ activeItem ? `bg-${ hoverColor } rounded-2xl` : "" }
                        hover:bg-${ hoverColor } hover:rounded-2xl 
                        transition-all duration-150 ease-out`
                    }
                    onMouseEnter={ event => {
                        event.preventDefault();
                        setIsHovered(true);
                        if (!activeItem && alternativeLogoPath !== undefined) {
                            const changeTimer = setTimeout(() => {
                                setLocalLogoPublicPath(alternativeLogoPath);
                            }, 10);

                            return () => clearTimeout(changeTimer);
                        }
                    }}
                    onMouseLeave={ event => {
                        event.preventDefault();
                        setIsHovered(false);
                        if (!activeItem && alternativeLogoPath !== undefined) {
                            const changeTimer = setTimeout(() => {
                                setLocalLogoPublicPath(logoPublicPath);
                            }, 10);

                            return () => clearTimeout(changeTimer);
                        }
                    }}
                >
                    <Link className="flex items-center justify-center h-full w-full" href={ url }
                       onClick={() => {
                           contextContainer.setSelectedItemName(url);
                           router.push(url);
                       }}
                    >
                        <img src={ localLogoPublicPath } alt={ serverName } />
                    </Link>
                </div>
            </li>
        </>
    )
}
