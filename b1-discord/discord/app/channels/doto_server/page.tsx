// ../discord/app/channels/doto_server/page.tsx

import {ChannelsProperties} from "@/app/_global_components/channels.component";
import ServerChannelContainer from "@/app/_global_components/server_channel_container";

export default function Page() {
    const channelProperties = {
        serverName: "Doto",
        textChannels: ["bienvenido", "general", "música", "hydra-song-requests"],
        voiceChannels: ["Doto party gaaaaaa", "amoung us", "Castigo"],
    } as ChannelsProperties;

    return (
        <>
            <ServerChannelContainer channelsProperties={ channelProperties } />
        </>
    )
}