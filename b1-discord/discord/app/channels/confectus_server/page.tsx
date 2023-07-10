// ../discord/app/channels/confectus_server/page.tsx

import {ChannelsProperties} from "@/app/_global_components/channels.component";
import ServerChannelContainer from "@/app/_global_components/server_channel_container";

export default function Page() {
    const channelProperties = {
        serverName: "El servidor de Confectus",
        textChannels: ["general", "memes"],
        voiceChannels: ["Dota 2", "Chill Out"],
        adminActions: true,
    } as ChannelsProperties;

    return (
        <>
            <ServerChannelContainer channelsProperties={ channelProperties } />
        </>
    )
}