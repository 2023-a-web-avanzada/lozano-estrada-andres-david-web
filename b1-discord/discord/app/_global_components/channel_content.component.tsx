// ../discord/app/_global_components/channel_content.component.tsx

'use client'

import ChannelHeader from "@/app/_global_components/channel_header.component";
import MessageInput from "@/app/_global_components/message_input.component";
import {useContext, useEffect, useState} from "react";
import {ChannelContextContainer} from "@/app/_context/channel_context_container";

type ChannelContentProperties = {
    serverPath: string,
};

export default function ChannelContent(
    properties: ChannelContentProperties,
) {
    const { serverPath } = properties;
    const channelContextContainer = useContext(ChannelContextContainer);
    const selectedChannel = channelContextContainer.selectedChannel;

    const dividerStyle = {
        height: '1.25px',
        backgroundImage: 'linear-gradient(to bottom, #1e1f22, #27292c',
    };

    // ===== USE STATES =====
    const [jsonData, setJsonData] = useState(null);

    // ===== USE EFFECTS =====
    useEffect(() => {
        async function fetchJsonData() {
            try {
                const response = await fetch(`../channels/${ serverPath }/${ selectedChannel }/messages.json`);
                const data = await response.json();
                setJsonData(data);
            } catch (error) {
                setJsonData(null);
            }
        }

        fetchJsonData().then(_ => undefined);
    }, [selectedChannel]);

    return (
        <>
            <div className={ "w-screen h-screen flex flex-col bg-[#313338]" }>
                {/* ===== CHANNEL HEADER ===== */}
                <ChannelHeader channelName={ "general" } />

                <div style={ dividerStyle }></div>

                {/* ===== CHANNEL MAIN CONTENT ===== */}
                <div className={ "flex-grow overflow-y-scroll bg-[#313338]" }>
                    { "File Content: " + JSON.stringify(jsonData) }
                </div>

                {/* ===== CHANNEL INPUT MESSAGE ===== */}
                <MessageInput />
            </div>
        </>
    )
}