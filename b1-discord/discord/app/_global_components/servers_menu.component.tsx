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
                        serverName={ "Direct Messages" }
                    />

                    {/* ===== SEPARATION LINE ===== */}
                    <li className="flex justify-center">
                        <div className="bg-[#313338] h-0.5 w-8 mb-2 rounded" />
                    </li>

                    {/* ===== SERVERS ITEMS ===== */}
                    <ServerItem
                        url={ "confectus_server" }
                        logoPublicPath={ "confectus_server/confectus.jpg" }
                        serverName={ "El servidor de Confectus" }
                    />

                    <ServerItem
                        url={ "labfis_server" }
                        logoPublicPath={ "" }
                        serverName={ "LABFIS" }
                    />

                    <ServerItem
                        url={ "epic_server" }
                        logoPublicPath={ "epic_server/epic.jpg" }
                        serverName={ "Єpic.ຮage" }
                    />

                    <ServerItem
                        url={ "doto_server" }
                        logoPublicPath={ "doto_server/doto.jpg" }
                        serverName={ "Doto" }
                    />

                    <ServerItem
                        url={ "tollusk_server" }
                        logoPublicPath={ "" }
                        serverName={ "Tollusk" }
                    />

                    <ServerItem
                        url={ "jar_server" }
                        logoPublicPath={ "jar_server/jar.jpg" }
                        serverName={ "G9" }
                    />

                    {/* ===== ADD A SERVER ITEM ===== */}
                    <ServerItem
                        url={ "add" }
                        logoPublicPath={ "../menu/add.svg" }
                        serverName={ "Añadir un servidor" }
                        alternativeLogoPath={ "../menu/add_hover.svg" }
                        greenFocusColor={ true }
                    />

                    {/* ===== EXPLORE SERVERS ITEM ===== */}
                    <ServerItem
                        url={ "explore" }
                        logoPublicPath={ "../menu/compass.svg" }
                        serverName={ "Explora servidores descubribles" }
                        alternativeLogoPath={ "../menu/compass_hover.svg" }
                        greenFocusColor={ true }
                    />

                    {/* ===== SEPARATION LINE ===== */}
                    <li className="flex justify-center">
                        <div className="bg-[#313338] h-0.5 w-8 mb-2 rounded" />
                    </li>

                    {/* ===== DOWNLOAD APPS ITEM ===== */}
                    <ServerItem
                        url={ "download" }
                        logoPublicPath={ "../menu/download.svg" }
                        serverName={ "Descargar aplicaciones" }
                        alternativeLogoPath={ "../menu/download_hover.svg" }
                        greenFocusColor={ true }
                    />
                </ul>
            </div>
        </>
    )
}
