// ../discord/app/channels/confectus_server/page.tsx

import Channels from "@/app/_global_components/channels.component";
import ChannelContent from "@/app/_global_components/channel_content.component";

export default function Page() {
    const serverName = "El servidor de Confectus";
    const textChannels = ["general", "memes"];
    const voiceChannels = ["Dota 2", "Chill Out"];

    return (
        <>
            <Channels
                serverName={ serverName }
                textChannels={ textChannels }
                voiceChannels={ voiceChannels }
                adminActions={ true }
            />
            <ChannelContent />
        </>
    )
}