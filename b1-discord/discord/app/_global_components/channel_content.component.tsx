// ../discord/app/_global_components/channel_content.component.tsx

'use client'

import ChannelHeader from "@/app/_global_components/channel_header.component";
import {useState} from "react";
import MessageInput from "@/app/_global_components/message_input.component";

export default function ChannelContent() {
    const dividerStyle = {
        height: '1.25px',
        backgroundImage: 'linear-gradient(to bottom, #1e1f22, #27292c',
    };

    return (
        <>
            <div className={ "w-screen h-screen flex flex-col bg-[#313338]" }>
                {/* ===== CHANNEL HEADER ===== */}
                <ChannelHeader channelName={ "general" } />

                <div style={ dividerStyle }></div>

                {/* ===== CHANNEL MAIN CONTENT ===== */}
                <div className={ "flex-grow overflow-y-scroll bg-[#313338]" }>
                    Hola
                </div>

                {/* ===== CHANNEL INPUT MESSAGE ===== */}
                <MessageInput />
            </div>
        </>
    )
}