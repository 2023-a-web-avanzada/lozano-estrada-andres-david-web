// ../discord/app/channels/confectus_server/components/channels.component.tsx

'use client'

import localFont from "next/font/local";
import {useState} from "react";

const semiBoldFont = localFont({ src: '../fonts/gg-sans-semi-bold.woff2' });

type ChannelsProperties = {
    serverName: string,
    textChannels: string[],
    voiceChannels: string[],
    adminActions?: boolean,
};

export default function Channels(
    properties: ChannelsProperties,
) {
    const { serverName, textChannels, voiceChannels, adminActions } = properties;

    const imageHeaderStyle = {
        height: "18px",
        width: "18px",
    };

    const dividerStyle = {
        height: '1.25px',
        backgroundImage: 'linear-gradient(to bottom, #1e1f22, #27292c',
    };

    // ===== USE STATES =====
    const [ localSelectedChannel, setLocalSelectedChannel ] = useState("general");

    return (
        <>
            <div className="bg-[#2b2d31] w-60">
                {/* ===== SERVER HEADER ===== */}
                <div className={ "h-12 w-full hover:bg-[#36383d] text-base " + semiBoldFont.className }>
                    <div className="flex items-center px-4 py-3">
                        <div className="flex-grow h-5">{ serverName }</div>
                        <img
                            className="ml-1 flex-shrink-0"
                            style={ imageHeaderStyle }
                            src={ "../server/big_deploy.svg" }
                            alt="V"
                        />
                    </div>
                </div>

                <div style={ dividerStyle }></div>

                {/* ===== CHANNELS ===== */}
                <div>
                    {/* ===== TEXT CHANNELS HEADER ===== */}
                    <div className="text-gray-light">
                        <div className="flex items-center pt-4 w-full hover:text-white mb-1">
                            <img
                                className="relative left-0.5 mt-0.5 w-3 h-3"
                                src={ "../server/deploy.svg" } alt="V"
                            />
                            <div className={
                                "pl-1 pt-0.5 text-xs leading-4 tracking-wide flex-grow " +
                                semiBoldFont.className }
                            >
                                CANALES DE TEXTO
                            </div>
                            <img
                                className="flex-shrink-0 pt-0.5 pr-4"
                                src={ "../server/add_channel.svg" } alt="+"
                            />
                        </div>

                        {/* ===== TEXT CHANNELS LIST ===== */}
                        <ul>
                            {
                                textChannels.map(channelName => (
                                    <li className={
                                        (localSelectedChannel === channelName ? "bg-[#404249] text-white " :
                                            "hover:bg-[#36373d] hover:text-white ") +
                                        "relative mx-2 mt-0.5 h-8 px-2 py-1.5 rounded flex items-center " +
                                        semiBoldFont.className
                                        }
                                        onClick={ event => {
                                            event.preventDefault();
                                            setLocalSelectedChannel(channelName);
                                        }}
                                    >
                                        <img className="h-5 w-5 mr-1.5" src={ "../server/hashtag.svg" } alt="#" />
                                        { channelName }
                                        <div className={
                                            (localSelectedChannel === channelName ? "visible " :
                                                "opacity-0 hover:opacity-100 ") +
                                            "absolute w-full h-full flex items-center"
                                        }>
                                            <img
                                                className={ "w-4 h-4 ml-auto " + (adminActions ? "mr-1 " : "mr-4 ") }
                                                src={ "../server/add_user.svg" }
                                                alt={ "Add User" }
                                            />
                                            { adminActions ?
                                                <img
                                                    className={ "w-4 h-4 mr-4" }
                                                    src={ "../server/channel_settings.svg" }
                                                    alt={ "Settings" }
                                                />
                                                : ""
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* ===== VOICE CHANNELS HEADER ===== */}
                    <div className="text-gray-light mt-0.5">
                        <div className="flex items-center pt-4 w-full hover:text-white mb-1">
                            <img
                                className="relative left-0.5 mt-0.5 w-3 h-3"
                                src={ "../server/deploy.svg" } alt="V"
                            />
                            <div className={
                                "pl-1 pt-0.5 text-xs leading-4 tracking-wide flex-grow " +
                                semiBoldFont.className
                            }>
                                CANALES DE VOZ
                            </div>
                            <img
                                className="flex-shrink-0 pt-0.5 pr-4"
                                src={ "../server/add_channel.svg" }
                                alt="+"
                            />
                        </div>

                        {/* ===== VOICE CHANNELS LIST ===== */}
                        <ul>
                            {
                                voiceChannels.map(channelName => (
                                    <li className={
                                        (localSelectedChannel === channelName ? "bg-[#404249] text-white " :
                                            "hover:bg-[#36373d] hover:text-white ") +
                                        "relative mx-2 mt-0.5 h-8 px-2 py-1.5 rounded flex items-center " +
                                        semiBoldFont.className
                                    }
                                        onClick={ event => {
                                            event.preventDefault();
                                            setLocalSelectedChannel(channelName);
                                        }}
                                    >
                                        <img className="h-5 w-5 mr-1.5" src={ "../server/sound.svg" } alt="#" />
                                        { channelName }
                                        <div className={
                                            (localSelectedChannel === channelName ? "visible " :
                                                "opacity-0 hover:opacity-100 ") +
                                            "absolute w-full h-full flex items-center"
                                        }>
                                            <img
                                                className={ "w-4 h-4 ml-auto mr-1" }
                                                src={ "../server/messages.svg" }
                                                alt={ "Add User" }
                                            />
                                            <img
                                                className={ "w-4 h-4 " + (adminActions ? "mr-1 " : "mr-4 ") }
                                                src={ "../server/add_user.svg" }
                                                alt={ "Add User" }
                                            />
                                            { adminActions ?
                                                <img
                                                    className={ "w-4 h-4 mr-4" }
                                                    src={ "../server/channel_settings.svg" }
                                                    alt={ "Settings" }
                                                />
                                                : ""
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div>Usuario</div>
            </div>
        </>
    )
}