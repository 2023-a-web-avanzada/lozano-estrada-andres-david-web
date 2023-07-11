// ../discord/app/_global_components/channel_content.component.tsx

'use client'

import ChannelHeader from "@/app/_global_components/channel_header.component";
import MessageInput from "@/app/_global_components/message_input.component";
import {useContext, useEffect, useState} from "react";
import {ChannelContextContainer} from "@/app/_context/channel_context_container";
import {MainMessageObject} from "@/app/_interfaces/main_message_object";
import {SimpleMessageObject} from "@/app/_interfaces/simple_message_object";
import localFont from "next/font/local";

const semiBoldFont = localFont({ src: '../fonts/gg-sans-semi-bold.woff2' });
const mediumFont = localFont({ src: '../fonts/gg-sans-medium.woff2' });
const normalFont = localFont({ src: '../fonts/gg-sans-normal.woff2' });

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
        height: "1px",
        marginTop: "48px",
        backgroundImage: "linear-gradient(to bottom, #1e1f22, #27292c",
    };

    // ===== USE STATES =====
    const [jsonData, setJsonData] = useState(undefined);

    // ===== USE EFFECTS =====
    useEffect(() => {
        async function fetchJsonData() {
            try {
                const response = await fetch(`../channels/${ serverPath }/${ selectedChannel }/messages.json`);
                const data = await response.json();
                setJsonData(data.messages);
            } catch (error) {
                setJsonData(undefined);
            }
        }

        fetchJsonData().then(_ => {});
    }, [selectedChannel]);

    return (
        <>
            <div className={ "relative w-screen h-screen flex flex-col bg-[#313338]" }>
                {/* ===== CHANNEL HEADER ===== */}
                <ChannelHeader channelName={ "general" } />

                <div className={ "absolute inset-0" } style={ dividerStyle }></div>

                {/* ===== CHANNEL MAIN CONTENT ===== */}
                <div className={ "flex-grow overflow-y-scroll bg-[#313338]" }>
                    <ol>
                        { jsonData ? renderMainMessage(jsonData) : "No hay nada capo!" }
                    </ol>
                    <div className={ "h-4" } />
                </div>

                {/* ===== CHANNEL INPUT MESSAGE ===== */}
                <MessageInput />
            </div>
        </>
    )
}

function renderMainMessage(jsonObject: MainMessageObject[]) {
    return jsonObject.map(message => (
        <>
            {
                message.userName === "-----" ?
                    <div className={ "h-px bg-[#52555b] w-auto mx-4 mt-6 mb-2" } />
                    :
                    <>
                        <li
                            className={ "relative flex bg-[#313338] hover:bg-[#2e3035] mb-1" }
                            style={{ marginTop: "17px", }}
                        >
                            {/* ===== USER PHOTO ===== */}
                            <div className={ "flex justify-center mt-0.5" } style={{ width: "72px", }}>
                                <img
                                    className={ "rounded-full" }
                                    style={{ height: "41px", width: "41px", }}
                                    src={ message.userPhotoPath }
                                    alt={ "User Message Photo" }
                                />
                            </div>

                            {/* ===== USER MAIN MESSAGE ===== */}
                            <div>
                                <div className={ "flex items-center" }>
                                    <h3 className={ mediumFont.className }>{ message.userName }</h3>
                                    <p
                                        className={ "ml-2 pt-1 leading-4 text-gray-light " + semiBoldFont.className }
                                        style={{ fontSize: "12px", lineHeight: "15px", }}
                                    >
                                        { parseDate(message.messageDate) }
                                    </p>
                                </div>
                                {
                                    message.message.endsWith(".png") ||
                                    message.message.endsWith(".jpg") ||
                                    message.message.endsWith(".gif")
                                        ?
                                        <img
                                            className={ "rounded-lg pb-1" }
                                            src={ message.message }
                                            alt={ "Message" }
                                            style={{ maxWidth: "550px", maxHeight: "350px", }}
                                        />
                                        :
                                        <p className={ "leading-5 text-base " + normalFont.className }>
                                            { message.message }
                                        </p>
                                }
                            </div>

                            {/* ===== FLOATING BOX ===== */}
                            <div className={ "opacity-0 hover:opacity-100 absolute flex inset-0 w-auto" }>
                                <img
                                    className={ "absolute right-0 mr-4 -mt-6 w-40 h-8" }
                                    src={ "../messages/floating.png" }
                                    alt={ "Flotante" }
                                />
                            </div>
                        </li>

                        {/* ===== USER SIMPLE MESSAGES ===== */}
                        { renderSimpleMessage(message.simpleMessages) }
                    </>
            }
        </>
    ));
}

function renderSimpleMessage(jsonObject: SimpleMessageObject[]) {
    return jsonObject.map(message => (
        <li
            className={ "flex relative items-center bg-[#313338] hover:bg-[#2e3035]" }
            style={{ paddingLeft: "72px", minHeight: "26px", }}
        >
            {
                message.message.endsWith(".png") ||
                message.message.endsWith(".jpg") ||
                message.message.endsWith(".gif")
                    ?
                    <img
                        className={ "my-0.5 rounded-lg py-px" }
                        src={ message.message }
                        alt={ "Message" }
                        style={{ maxWidth: "550px", maxHeight: "350px", }}
                    />
                    :
                    <p className={ "leading-5 text-base " + normalFont.className }>
                        { message.message }
                    </p>
            }

            <div className={ "opacity-0 hover:opacity-100 absolute flex inset-0 w-auto" }>
                <p className={ "absolute -left-0.5 mt-1.5 text-gray-light " + normalFont.className }
                   style={{ fontSize: "10.5px", lineHeight: "15px", marginLeft: "33px", }}
                >
                    { parseTime(message.messageDate) }
                </p>

                {/* ===== FLOATING BOX ===== */}
                <img
                    className={ "absolute right-0 mr-4 -mt-6 w-40 h-8" }
                    src={ "../messages/floating.png" }
                    alt={ "Flotante" }
                />
            </div>
        </li>
    ));
}

function parseDate(date: string) {
    const dateObject = new Date(date);

    return dateObject.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 }) + "/" +
        (dateObject.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })  + "/" +
        dateObject.getFullYear() + " " +
        dateObject.getHours() + ":" +
        dateObject.getMinutes();
}

function parseTime(date: string) {
    const dateObject = new Date(date);

    return dateObject.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 }) +
        ":" + dateObject.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 });
}