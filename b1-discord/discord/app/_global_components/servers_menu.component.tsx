// ../discord/app/_global_components/servers_menu.component.tsx

import ServerItem from "@/app/_global_components/server_item.component";

export default function ServersMenu() {
    const menuStyle = {
        width: "72px",
    };

    return (
        <>
            <div className="bg-[#1e1f22] py-3" style={ menuStyle }>
                <ul className="">
                    {/* ===== MESSAGES ITEM ===== */}
                    <ServerItem
                        url={ "messages" }
                        logoPublicPath={ "../menu/discord.svg" }
                        serverName={ "Messages" }
                    />

                    {/* ===== SEPARATION LINE ===== */}
                    <li className="flex justify-center">
                        <div className="bg-[#313338] h-0.5 w-8 mb-2 rounded" />
                    </li>

                    {/* ===== SERVERS ITEMS ===== */}
                    <ServerItem
                        url={ "confectus_server" }
                        logoPublicPath={ "confectus_server/logo.png" }
                        serverName={ "Confectus Server Page" }
                    />

                    <ServerItem
                        url={ "labfis_server" }
                        logoPublicPath={ "labfis_server/logo.png" }
                        serverName={ "LAB FIS Server Page" }
                    />

                    <ServerItem
                        url={ "#" }
                        logoPublicPath={ "" }
                        serverName={ "#" }
                    />

                    <ServerItem
                        url={ "#" }
                        logoPublicPath={ "" }
                        serverName={ "#" }
                    />

                    <ServerItem
                        url={ "#" }
                        logoPublicPath={ "" }
                        serverName={ "#" }
                    />

                    <ServerItem
                        url={ "#" }
                        logoPublicPath={ "" }
                        serverName={ "#" }
                    />

                    {/* ===== ADD A SERVER ITEM ===== */}
                    <ServerItem
                        url={ "#" }
                        logoPublicPath={ "../menu/add.svg" }
                        serverName={ "Add a server" }
                        alternativeLogoPath={ "../menu/add_hover.svg" }
                    />

                    {/* ===== EXPLORE SERVERS ITEM ===== */}
                    <ServerItem
                        url={ "#" }
                        logoPublicPath={ "../menu/compass.svg" }
                        serverName={ "Explore discoverable servers" }
                        alternativeLogoPath={ "../menu/compass_hover.svg" }
                    />

                    {/* ===== SEPARATION LINE ===== */}
                    <li className="flex justify-center">
                        <div className="bg-[#313338] h-0.5 w-8 mb-2 rounded" />
                    </li>

                    {/* ===== DOWNLOAD APPS ITEM ===== */}
                    <ServerItem
                        url={ "#" }
                        logoPublicPath={ "../menu/download.svg" }
                        serverName={ "Download apps" }
                        alternativeLogoPath={ "../menu/download_hover.svg" }
                    />
                </ul>
            </div>
        </>
    )
}
