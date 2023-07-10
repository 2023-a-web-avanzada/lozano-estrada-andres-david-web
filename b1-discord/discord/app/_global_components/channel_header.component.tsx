// ../discord/app/_global_components/channel_header.component.tsx

import localFont from "next/font/local";

const semiBoldFont = localFont({ src: '../fonts/gg-sans-semi-bold.woff2' });
const mediumFont = localFont({ src: '../fonts/gg-sans-medium.woff2' });

type ChannelHeaderProperties = {
    channelName: string,
};

export default function ChannelHeader(
    properties: ChannelHeaderProperties,
) {
    const { channelName } = properties;

    return (
        <>
            <div className={ "relative flex items-center h-12 w-full px-2 bg-[#313338]" }>
               {/* ===== CHANNEL NAME ===== */}
               <div className={ "flex items-center flex-grow " + semiBoldFont.className }>
                   <img className={ "mx-2" } src={ "../server/hashtag.svg" } alt={ "#" } />
                   { channelName }
               </div>

               {/* ===== ACTIONS ===== */}
               <div className={ "flex items-center" }>
                   <img className={ "mx-2" } src={ "../header/hashtag_message.svg" } alt={ "#" } />
                   <img className={ "mx-2" } src={ "../header/notification.svg" } alt={ "#" } />
                   <img className={ "mx-2" } src={ "../header/pin.svg" } alt={ "#" } />
                   <img className={ "mx-2" } src={ "../header/friends.svg" } alt={ "#" } />

                   {/* ===== SEARCH ===== */}
                   <div
                       className={ "flex items-center w-36 h-6 mx-2 px-05 rounded bg-[#1e1f22] " +
                           mediumFont.className }
                       style={{ fontSize: "14px", }}
                   >
                       <div className={ "text-gray-light py-0.5 pl-1.5" } style={{ width: "116px", }}>
                           Buscar
                       </div>
                       <div className={ "flex items-center justify-center w-6 h-6 ml-0.5" } >
                           <img className={ "w-4 h-4" } src={ "../header/search.svg" } alt={ "Search" } />
                       </div>
                   </div>

                   <img className={ "mx-2" } src={ "../header/box.svg" } alt={ "#" } />
                   <img className={ "mx-2" } src={ "../header/question.svg" } alt={ "#" } />
               </div>
            </div>
        </>
    )
}