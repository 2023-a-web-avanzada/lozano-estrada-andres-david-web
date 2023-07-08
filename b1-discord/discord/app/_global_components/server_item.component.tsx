// ../discord/app/_global_components/server_item.component.tsx

'use client'

import React, { useContext, useState } from "react";
import { ContextContainer } from "@/app/_context/context_container";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import localFont from 'next/font/local'

const mediumFont = localFont({ src: '../fonts/gg-sans-medium.woff2' });
const semiBoldFont = localFont({ src: '../fonts/gg-sans-semi-bold.woff2' });

type ServerItemProperties = {
    url: string,
    logoPublicPath: string,
    alternativeLogoPath?: string,
    serverName: string,
    greenFocusColor?: boolean,
};

export default function ServerItem(
    properties: ServerItemProperties,
) {
    const { url, logoPublicPath, alternativeLogoPath, serverName, greenFocusColor, } = properties;
    const contextContainer = useContext(ContextContainer);
    const activeItem = contextContainer.selectedItemName === url;
    const router = useRouter();

    // ===== USE STATES =====
    const [localLogoPublicPath, setLocalLogoPublicPath] = useState(logoPublicPath);
    const [isHovered, setIsHovered] = useState(false);

    let itemIconStyle = getItemIconStyle(activeItem, localLogoPublicPath, logoPublicPath, greenFocusColor);

    const itemStyle = {
        width: "72px",
        fontSize: "1.125rem",
    };

    const floatingMessageStyle = {
        width: "0px",
        height: "0px",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        borderRight: "5px solid #111214",
        marginLeft: "11px",
    }

    return (
        <>
            <li
                className={"h-12 w-max flex items-center mb-2 " + mediumFont.className }
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
                    className={ itemIconStyle }
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
                    {/* ===== ITEM IMAGE ===== */}
                    <Link className="flex items-center justify-center relative h-full w-full" href={ url }
                       onClick={() => {
                           contextContainer.setSelectedItemName(url);
                           router.push(url);
                       }}
                    >
                        <img
                            className={ localLogoPublicPath.endsWith("svg") || logoPublicPath === "" ?
                                "" : (activeItem ? "absolute inset-0 object-cover h-full w-full rounded-2xl" :
                                    "absolute inset-0 object-cover h-full w-full rounded-3xl hover:rounded-2xl " +
                                    "transition-all duration-150 ease-out") }
                            src={ localLogoPublicPath }
                            alt={ logoPublicPath !== "" ? serverName : serverName[0] }
                        />
                    </Link>

                    {/* ===== FLOATING MESSAGE ===== */}
                    <div className={ (isHovered ? "" : "hidden ") + "absolute flex items-center z-10 left-0 ml-16" }>
                        <div style={ floatingMessageStyle } />
                        <div className={
                            "bg-[#111214] p-2 rounded " +
                            "text-[#dbdee1] break-words text-base " + semiBoldFont.className
                        }
                             style={{ maxWidth: "195px" }}
                        >
                            { serverName }
                        </div>
                    </div>

                </div>
            </li>
        </>
    )
}

function getItemIconStyle(activeItem: boolean, imageExtension: string, imagePath: string, greenFocusColor?: boolean) {
    let itemIconStyle = "h-12 w-12 flex items-center justify-center aspect-square";

    if (imageExtension.endsWith("svg") || imagePath === "") {
        if (activeItem) {
            if (greenFocusColor) {
                itemIconStyle = "h-12 w-12 flex items-center justify-center aspect-square " +
                    `bg-[#23a559] rounded-2xl`;
            } else {
                itemIconStyle = `h-12 w-12 flex items-center justify-center aspect-square bg-[#5865f2] rounded-2xl`;
            }
        } else {
            if (greenFocusColor) {
                itemIconStyle = "h-12 w-12 flex items-center justify-center aspect-square " +
                    `bg-[#313338] rounded-3xl hover:bg-[#23a559] hover:rounded-2xl ` +
                    "transition-all duration-150 ease-out";
            } else {
                itemIconStyle = "h-12 w-12 flex items-center justify-center aspect-square " +
                    "bg-[#313338] rounded-3xl hover:bg-[#5865f2] hover:rounded-2xl " +
                    "transition-all duration-150 ease-out";
            }
        }
    }

    return itemIconStyle;
}
