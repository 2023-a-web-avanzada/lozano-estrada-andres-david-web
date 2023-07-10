// ../discord/app/_global_components/message_input.component.tsx

import localFont from "next/font/local";

const normalFont = localFont({ src: '../fonts/gg-sans-normal.woff2' });

export default function MessageInput() {
    return (
        <>
            <div className={ "relative flex items-center h-12 w-full px-4" } style={{ height: "68px", }}>
                <div className={ "bg-[#383a40] flex items-center rounded-lg w-full h-11 mb-6" }>
                    <div className={ "flex items-center justify-center h-full" } style={{ width: "56px", }}>
                        <img src={ "../input/plus.svg" } alt={ "Plus" } />
                    </div>

                    <input
                        className={ "flex-grow outline-none text-gray-darker bg-[#383a40] " + normalFont.className }
                        placeholder={ "Enviar mensaje a #" + "general" }
                    />

                    <div className={ "flex items-center mr-1" }>
                        <div className={ "mx-1 px-1" }>
                            <img className={ "w-6 h-6" } src={ "../input/gift.svg" } alt={ "Gift" } />
                        </div>
                        <div className={ "mx-1 px-1" }>
                            <img className={ "w-6 h-6" } src={ "../input/gif.svg" } alt={ "Gif" } />
                        </div>
                        <div className={ "mx-1 px-1" }>
                            <img className={ "w-5 h-5" } src={ "../input/page.svg" } alt={ "Page" } />
                        </div>
                        <div className={ "mx-1 pl-0.5 pr-1" }>
                            <img className={ "w-6 h-6" } src={ "../input/emoticon.svg" } alt={ "Gift" } />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}