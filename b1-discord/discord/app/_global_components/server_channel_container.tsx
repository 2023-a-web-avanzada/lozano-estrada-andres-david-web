// ../discord/app/_global_components/server_channel_container.tsx

'use client'

import {usePathname} from "next/navigation";
import {useState} from "react";
import {ChannelContextContainer} from "@/app/_context/channel_context_container";
import {ChannelContextObject} from "@/app/_interfaces/channel_context_object";
import Channels, {ChannelsProperties} from "@/app/_global_components/channels.component";
import ChannelContent from "@/app/_global_components/channel_content.component";

type ServerChannelContainerProperties = {
    channelsProperties: ChannelsProperties,
};

export default function ServerChannelContainer(
    properties: ServerChannelContainerProperties,
) {
    const { channelsProperties } = properties;
    const currentPath = usePathname();
    const currentServer = currentPath.split("/")[2];

    // ===== USE STATES =====
    const [selectedChannel, setSelectedChannel] = useState(channelsProperties.textChannels[0]);

    const channelContextObject: ChannelContextObject = {
        selectedChannel,
        setSelectedChannel,
    };

    return (
        <>
            <ChannelContextContainer.Provider value={ channelContextObject }>
                <Channels
                    serverName={ channelsProperties.serverName }
                    textChannels={ channelsProperties.textChannels }
                    voiceChannels={ channelsProperties.voiceChannels }
                    adminActions={ channelsProperties.adminActions }
                />
                <ChannelContent serverPath={currentServer} />
            </ChannelContextContainer.Provider>
        </>
    )
}