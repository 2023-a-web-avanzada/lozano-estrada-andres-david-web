import { PostProps } from "@/app/padlet/types/postProps";
import { useState } from "react";
import localFont from "next/font/local";

const oricons = localFont({ src: '../../fonts/oricons.woff2' });

export default function Post(
    postProps: PostProps
) {
    const { author, topic, content, likes, creationDate, onDelete } = postProps;
    const { userName, userImagePath } = author;

    const [ numberOfLikes, setNumberOfLikes ] = useState(likes);
    const [ time, setTime ] = useState('1m');   // ****************** RECEIVE CHANGE TIME ******************************

    const postStyle = {
        height: 'min-content'
    };

    return (
        <>
            <div
                className={ `bg-[#ffffff] rounded-xl border-gray-900 drop-shadow 
                    lg:w-[calc(25%-6px)] md:w-[calc(25%-6px)] sm:w-[calc(50%-4px)]`}
                style={ postStyle }
            >
                {/* FLOAT OPTIONS */}
                <div className={ 'cursor-pointer absolute z-10 right-0 group ltr:rounded-tr-xl ' +
                        'rtl:rounded-tl-xl hover:bg-white hover:rounded-xl' }>
                    <div className={ 'transform' }>
                        <div className={ 'h-[29px] w-min relative flex ltr:pl-1 rtl:pr-1 overflow-hidden' }>
                            <div className={ 'transform transition-transform flex group justify-start items-start ' }>
                                <span className={ 'select-none text-xs py-0 px-1.5 h-4 mt-2 mb-[5px] ' +
                                        'text-black text-opacity-0 group-hover:text-opacity-50 font-semibold' }>
                                    <span
                                        className={ 'hover:text-black' }
                                        onClick={ onDelete }
                                    >
                                        Eliminar
                                    </span>
                                </span>
                            </div>

                            <div
                                className={ 'z-20 opacity-0 group-hover:opacity-100 transition-opacity mt-2 ' +
                                    'mb-[5px] border-r-[0.5px] border-solid ' }
                                style={{ borderColor: 'rgba(29, 29, 29, 0.2)' }}
                            />

                            <div className={ 'cursor-pointer flex relative text-opacity-50 hover:text-black ' +
                                    'items-center overflow-visible z-10 text-black pt-[3px] px-[3px]' }>
                                <i
                                    className={ 'font-normal w-4 h-4 text-base not-italic ' + oricons.className }
                                    style={{ lineHeight: '1' }}
                                >
                                    more_vertical
                                </i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={ 'pr-2 pt-2 pl-2 pb-3 text-black' }>
                    {/* HEADER */}
                    <div>
                        <div className={ 'flex items-center pl-1 pr-1' }>
                            <img
                                className={ 'w-4 rounded-full' }
                                src={ `/users/${ userImagePath }` }
                                alt={ 'User image' }
                            />

                            <span className={ 'cursor-pointer flex ml-2 text-xs leading-4 font-semibold' }>
                                { userName }
                            </span>

                            <time className={ 'cursor-pointer ml-1 text-xs font-normal opacity-40' }>
                                { time }
                            </time>
                        </div>

                        {/* TOPIC */}
                        <div
                            className={ 'select-none mt-2 pl-1 pr-1 font-semibold leading-6' }
                            style={{ fontSize: '17px', letterSpacing: '-0.013em' }}
                        >
                            { topic }
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div
                        className={ 'select-none pl-1 pr-1 mt-1.5 text-sm' }
                        style={{ letterSpacing: '-0.006em', lineHeight: '21px' }}
                    >
                        <span>
                            { content }
                        </span>
                    </div>
                </div>

                {/* LINE */}
                <div
                    className={ 'ml-2 mr-2 border-solid' }
                    style={{ borderTopWidth: '.5px', borderColor: 'rgba(29, 29, 29, 0.2)' }}
                />

                {/* LIKES */}
                <div
                    className={ 'flex flex-row justify-between flex-1 pl-3 pb-3 pr-3 pt-2' }
                    onClick={e => {
                        e.preventDefault();
                    }}
                >
                    <div className={ 'flex items-end cursor-pointer' }>
                        <i
                            className={ 'font-normal normal-nums text-lg not-italic ' + oricons.className }
                            style={{ color: 'rgba(0, 0, 0, 0.54)', height: '18px', maxWidth: '18px', lineHeight: '1' }}
                        >
                            heart_outline
                        </i>

                        <span
                            className={ 'ms-0.5 text-xs' }
                            style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                        >
                            { numberOfLikes }
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}