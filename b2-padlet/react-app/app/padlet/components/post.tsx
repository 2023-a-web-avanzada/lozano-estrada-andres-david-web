import { PostProps } from "@/app/padlet/types/postProps";
import { useEffect, useState } from "react";
import localFont from "next/font/local";

const oricons = localFont({ src: '../../fonts/oricons.woff2' });

export default function Post(
    postProps: PostProps
) {
    const { author, topic, content, usersWhoLiked, creationDate, onDelete, onLike } = postProps;
    const { userName, userImagePath } = author;

    const [ time, setTime ] = useState('1m');

    useEffect(() => {
        // Formatting the time passed
        const currentDate = new Date();
        const initialDate = new Date(creationDate);
        const difference = currentDate.getTime() - initialDate.getTime();

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            setTime(`${days}d`);
        } else if (hours > 0) {
            setTime(`${hours}h`);
        } else if (minutes > 0) {
            setTime(`${minutes}m`);
        } else if (minutes === 0) {
            setTime('1m');
        }
    }, []);

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
                        onLike();
                    }}
                >
                    <div className={ 'flex items-end cursor-pointer ' +
                        (usersWhoLiked.length > 0 ? 'text-[#9367e3]' : 'text-[#0000008a]') }
                    >
                        <i
                            className={ 'font-normal normal-nums text-lg not-italic ' + oricons.className }
                            style={{ height: '18px', maxWidth: '18px', lineHeight: '1' }}
                        >
                            {
                                usersWhoLiked.length > 0 ? 'heart_filled' : 'heart_outline'
                            }
                        </i>

                        <span className={ 'ms-0.5 text-xs' }>
                            { usersWhoLiked.length }
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}