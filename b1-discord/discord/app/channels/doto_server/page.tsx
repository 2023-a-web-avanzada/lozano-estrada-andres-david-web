// ../discord/app/channels/doto_server/page.tsx

import Channels from "@/app/_global_components/channels.component";

export default function Page() {
    const serverName = "Doto";
    const textChannels = ["bienvenido", "general", "música", "hydra-song-requests"];
    const voiceChannels = ["Doto party gaaaaaa", "amoung us", "Castigo"];

    return (
        <>
            <Channels
                serverName={ serverName }
                textChannels={ textChannels }
                voiceChannels={ voiceChannels }
                adminActions={ false }
            />
        </>
    )
}