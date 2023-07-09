// ../discord/app/_global_components/user_controls.component.tsx

'use client'

import localFont from "next/font/local";
import {useState} from "react";

const semiBoldFont = localFont({ src: '../fonts/gg-sans-semi-bold.woff2' });
const normalFont = localFont({ src: '../fonts/gg-sans-normal.woff2' });

type UserControlProperties = {
    userName: string,
    userImagePath: string,
    userStatus: string,
};

export default function UserControls(
    properties: UserControlProperties,
) {
    const { userName, userImagePath, userStatus } = properties;

    const containerStyle = {
        height: "53px",
    };

    const statusStyle = {
        height: "15px",
        width: "15px",
        padding: "2.75px",
    }

    const userBoxStyle = {
        height: "39px",
    }

    // ===== USE STATES =====
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div
                className={ "absolute bottom-0 w-full h-20 px-2 pb-px flex items-center bg-[#232428]" }
                style={ containerStyle }
                onMouseEnter={ event => {
                    event.preventDefault();
                    setIsHovered(true);
                }}
                onMouseLeave={ event => {
                    event.preventDefault();
                    setIsHovered(false);
                }}
            >
                <div
                    className={ "flex items-center -ml-0.5 mr-2 pl-0.5 rounded hover:bg-[#36383d]" }
                    style={ userBoxStyle }
                >
                    {/* ===== USER PHOTO ===== */}
                    <div className={ "relative flex items-center h-8 w-8" }>
                        <img
                            className={ "rounded-full" }
                            src={ userImagePath }
                            alt={ "User photo" }
                        />
                        <div className={
                            "absolute flex items-center justify-center " +
                            "-right-0.5 -bottom-0.5 rounded-full bg-[#232428]"
                            } style={ statusStyle }
                        >
                            {
                                userStatus === "En línea" ?
                                    <div className={ "rounded-full h-full w-full bg-[#23a55a]" } /> : ""
                            }
                            {
                                userStatus === "No molestar" ?
                                    <div className={
                                        "flex items-center justify-center rounded-full h-full w-full bg-[#f23f43]"
                                    }>
                                        <div className={ "w-1.5 h-0.5 rounded-2xl bg-[#232428]" } />
                                    </div> : ""
                            }
                        </div>
                    </div>

                    {/* ===== USER STATUS AND NAME ===== */}
                    <div className={ "mr-1 py-1 pl-2" }>
                        <div
                            className={ "" + semiBoldFont.className }
                             style={{ fontSize: "14px", width: "76px", lineHeight: "18px", }}
                        >
                            { userName }
                        </div>
                        <div
                            className={ "text-gray-light " + normalFont.className }
                            style={{ fontSize: "12px", height: "13px", lineHeight: "13px", }}
                        >
                            { isHovered ? userName.toLowerCase() : userStatus}
                        </div>
                    </div>
                </div>

                {/* ===== CONTROLS ===== */}
                <div className={ "flex items-center" }>
                    <div className={ "w-8 h-8 rounded hover:bg-[#36383d] flex items-center justify-center" }>
                        <img src={ "../user/microphone.svg" } alt={ "Microphone" } />
                    </div>
                    <div className={ "w-8 h-8 rounded hover:bg-[#36383d] flex items-center justify-center" }>
                        <img src={ "../user/headsets.svg" } alt={ "Headsets" } />
                    </div>
                    <div className={ "w-8 h-8 rounded hover:bg-[#36383d] flex items-center justify-center" }>
                        <img src={ "../user/user_settings.svg" } alt={ "User Settings" } />
                    </div>
                </div>
            </div>
        </>
    )
}