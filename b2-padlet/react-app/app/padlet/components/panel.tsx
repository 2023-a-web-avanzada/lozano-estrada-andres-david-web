'use client'

import { useForm } from "react-hook-form";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { PanelProps } from "@/app/padlet/types/panelProps";
import {PostForm} from "@/app/padlet/types/postForm";

const alps = localFont({ src: '../../fonts/alps.woff2' });
const oricons = localFont({ src: '../../fonts/oricons.woff2' });

export default function Panel(
    props: PanelProps
) {
    const { onHide, onAddPost } = props;

    const [ isValidForm, setIsValidForm ] = useState(false);
    const [ topicAreaValue, setTopicAreaValue ] = useState("");
    const [ contentAreaValue, setContentAreaValue ] = useState("");

    const { handleSubmit, register } = useForm({
        defaultValues: {
            topic: '',
            content: '',
        },
        mode: "onChange"
    });

    useEffect(() => {
        handlePublishButton();
    }, [ topicAreaValue, contentAreaValue ]);

    const handleTopicArea = (event: any) => {
        setTopicAreaValue(event.target.value);
        handlePublishButton();
    };

    const handleContentArea = (event: any) => {
        setContentAreaValue(event.target.value);
        handlePublishButton();
    };

    const handlePublishButton = () => {
        topicAreaValue.trim() === '' && contentAreaValue.trim() === '' ? setIsValidForm(false) : setIsValidForm(true);
    };

    // Delegating adding a post to the parent
    const handlePostAdding = (data: PostForm) => {
        onAddPost(data);
        onHide();
    };

    return (
        <>
            <div className={ 'h-full w-full md:h-auto md:w-auto my-0 md:mt-8 md:max-h-[calc(100%-6rem)] ' +
                'md:mb-14 flex pointer-events-none text-[#c1c7cd]' }>
                <div className={ 'w-12 sm:w-0 pointer-events-none' }></div>

                {/* PANEL */}
                <form
                    className={ 'pointer-events-auto relative flex flex-col sm:w-full md:rounded-3xl min-h-[540px] ' +
                        'md:min-w-[540px]' }
                    style={{ background: 'rgba(17, 17, 17, 1)' }}
                    onSubmit={ handleSubmit(handlePostAdding) }
                >
                    {/* OPTIONS */}
                    <div
                        className={ 'flex justify-between pt-3 pb-2 px-3 md:pt-4 md:pb-3 md:px-4 flex-shrink-0' }
                        dir={ 'ltr' }
                    >
                        <div className={ 'flex space-x-2 rtl:space-x-reverse flex-shrink-0' }>
                            {/* CLOSE BUTTON */}
                            <button
                                className={ 'cursor-pointer flex items-center justify-center bg-[#1a1a1a] ' +
                                    'hover:bg-[#545559] text-center rounded-2xl h-10 w-10' }
                                title={ 'Cerrar publicación' }
                                onClick={ onHide }
                            >
                                <i className={ 'color-[#cccccb] not-italic ' + oricons.className }>
                                    close
                                </i>
                            </button>

                            <div
                                className={ 'cursor-pointer flex items-center ml-2 justify-center bg-[#1a1a1a] ' +
                                    'hover:bg-[#545559] text-center rounded-2xl h-10 w-10' }
                                title={ 'Cerrar publicación' }
                            >
                                <i className={ 'color-[#cccccb] not-italic ' + oricons.className }>
                                    dock
                                </i>
                            </div>
                        </div>

                        {/* PUBLISH */}
                        <div className={ 'space-s-3 flex-grow flex rtl:space-x-reverse items-center justify-end ps-3' }>
                            <div className={ 'cursor-pointer h-full' }>
                                <div className={ 'flex text-center justify-center gap-1 items-center' }>
                                    <span className={ 'flex mt-0.5 items-center justify-center text-center w-7 h-7' }>
                                        <i className={ 'max-w-[20px] max-h-[20px] text-xl ' +
                                            'not-italic ' + oricons.className } >
                                            clock_add
                                        </i>
                                    </span>
                                </div>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                className={ 'select-none border-none bg-[#313132] flex items-center justify-center ' +
                                    'text-center py-0 h-10 rounded-2xl font-semibold max-w-[105.45px] ml-3 px-5 ' +
                                    (!isValidForm ? 'cursor-not-allowed text-[#5a5a5b]' : 'cursor-pointer ' +
                                        'bg-[#ff4081] text-white hover:animate-oscillate-background')}
                                disabled={ !isValidForm }
                                type={ 'submit' }
                            >
                                <span
                                    className={ 'flex-1 overflow-visible ' + alps.className }
                                    style={{ fontSize: '17px', letterSpacing: '-0.013em' }}
                                >Publicar</span>
                            </button>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className={ 'flex flex-row flex-grow overflow-hidden sm:order-last' }>
                        <div className={ 'md:pt-3 relative flex flex-col flex-grow overflow-hidden md:w-135' }>
                            <div className={ 'px-4 mb-16 md:mb-4 flex flex-col flex-grow ' +
                                'overflow-y-auto overflow-x-hidden' }>

                                {/* TOPIC AREA */}
                                <div className={ 'mx-2 flex mt-3 md:mt-0' }>
                                    <textarea
                                        className={ 'text-xl h-[28px] resize-none w-full outline-none ' +
                                            'bg-transparent mb-0 overflow-hidden shadow-none font-semibold ' +
                                            'text-white placeholder-[#515151] border-none flex-shrink-0 ' +
                                            alps.className }
                                        id={ 'topic' }
                                        rows={ 1 }
                                        placeholder={ 'Asunto' }
                                        title={ 'Asunto de la publicación' }
                                        {...register('topic')}
                                        value={ topicAreaValue }
                                        onChange={ handleTopicArea }
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className={ 'font-normal bg-transparent font-sans flex grow mt-3 md:mt-4 mx-2 ' +
                                    'order-last resize-none border-none shadow-none min-h-[171px] outline-none ' +
                                    alps.className }>
                                    <textarea
                                        className={ 'min-h-[24px] h-full w-full resize-none outline-none ' +
                                            'bg-transparent font-normal ' + alps.className +
                                            (contentAreaValue.trim() !== '' ? ' text-white' : '') }
                                        placeholder={ 'Escribe algo bonito...' }
                                        style={{ fontSize: '17px', letterSpacing: '-0.013em', lineHeight: '1.5' }}
                                        id={ 'content' }
                                        title={ 'Editor de contenido para publicaciones' }
                                        {...register('content')}
                                        value={ contentAreaValue }
                                        onChange={ handleContentArea }
                                    />
                                </div>

                                {/* OPTIONS */}
                                <div
                                    className={ 'mt-4 min-h-[165px] flex md:order-2 sm:order-last justify-center ' +
                                        'items-center cursor-pointer md:bg-[url(/assets/background.svg)] ' +
                                        'sm:bg-[url(/assets/large.svg)] md:static sm:-bottom-[115px] sm:absolute ' +
                                        'md:max-w-[540px] sm:max-w-[1120px] sm:w-full sm:self-center sm:bg-center ' +
                                        'sm:bg-top' }
                                >
                                    <div className={ 'flex flex-row space-x-9 rtl:space-x-reverse sm:-mt-32 md:mt-0' }>
                                        <div
                                            className={ 'flex items-center justify-center select-none min-w-[32px] ' +
                                                'max-w-[32px] min-h-[37px] max-h-[37px] bg-[#3dc731]' }
                                            style={{
                                                maskImage: 'url(/assets/mask.svg)',
                                                maskSize: '100% 100%'
                                            }}
                                        >
                                            <i className={ 'text-xl text-white font-normal not-italic ' +
                                                oricons.className }>
                                                upload
                                            </i>
                                        </div>
                                    </div>

                                    <div className={ 'flex flex-row space-x-9 rtl:space-x-reverse sm:-mt-32 md:mt-0' }>
                                        <div
                                            className={ 'flex items-center justify-center select-none min-w-[32px] ' +
                                                'max-w-[32px] min-h-[37px] max-h-[37px] ml-9 bg-[#3dc731]' }
                                            style={{
                                                maskImage: 'url(/assets/mask.svg)',
                                                maskSize: '100% 100%'
                                            }}
                                        >
                                            <i className={ 'text-xl text-white font-normal not-italic ' +
                                                oricons.className }>
                                                camera
                                            </i>
                                        </div>
                                    </div>

                                    <div className={ 'flex flex-row space-x-9 rtl:space-x-reverse sm:-mt-32 md:mt-0' }>
                                        <div
                                            className={ 'flex items-center justify-center select-none min-w-[32px] ' +
                                                'max-w-[32px] min-h-[37px] max-h-[37px] ml-9 bg-[#ff833e]' }
                                            style={{
                                                maskImage: 'url(/assets/mask.svg)',
                                                maskSize: '100% 100%'
                                            }}
                                        >
                                            <i className={ 'text-xl text-white font-normal not-italic ' +
                                                oricons.className }>
                                                link
                                            </i>
                                        </div>
                                    </div>

                                    <div className={ 'flex flex-row space-x-9 rtl:space-x-reverse sm:-mt-32 md:mt-0' }>
                                        <div
                                            className={ 'flex items-center justify-center select-none min-w-[32px] ' +
                                                'max-w-[32px] min-h-[37px] max-h-[37px] ml-9 bg-[#ff833e]' }
                                            style={{
                                                maskImage: 'url(/assets/mask.svg)',
                                                maskSize: '100% 100%'
                                            }}
                                        >
                                            <i className={ 'text-xl text-white font-normal not-italic ' +
                                                oricons.className }>
                                                image_search
                                            </i>
                                        </div>
                                    </div>

                                    <div className={ 'flex flex-row space-x-9 rtl:space-x-reverse sm:-mt-32 md:mt-0' }>
                                        <div
                                            className={ 'flex items-center justify-center select-none min-w-[32px] ' +
                                                'max-w-[32px] min-h-[37px] max-h-[37px] ml-9 bg-[#ff4081]' }
                                            style={{
                                                maskImage: 'url(/assets/mask.svg)',
                                                maskSize: '100% 100%'
                                            }}
                                        >
                                            <i className={ 'text-xl text-white font-normal not-italic ' +
                                                oricons.className }>
                                                dot_3_horizontal
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLOR */}
                    <div className={ 'px-4 flex space-s-3 md:space-s-4 flex-shrink-0 sm:order-2 ' +
                        'pt-3 pb-1 md:pt-0 md:pb-4 items-center text-center md:order-last lg:order-last' }>
                        <div className={ 'flex-shrink-0 h-6 md:h-8 py-1 md:py-0 md:rounded-3xl space-s-1 ' +
                            'md:space-s-1.5 justify-center ps-1.5 pe-2 md:ps-2.5 md:pe-3 capitalize group ' +
                            'bg-[#323335] cursor-pointer select-none rounded-lg border-none flex ' +
                            'space-s-1 items-center' }>
                            <div className={ 'h-3 md:h-4 w-3 md:w-4 bg-[#f5f6f7] border-none rounded-xl ring-inset' } />
                            <div
                                className={ 'truncate ml-[6px] text-xs ' + alps.className }
                                style={{ lineHeight: '18px' }}
                            >Blanco</div>
                        </div>
                    </div>
                </form>

                <div className={ 'w-12 sm:w-0 pointer-events-none' }></div>
            </div>
        </>
    )
}