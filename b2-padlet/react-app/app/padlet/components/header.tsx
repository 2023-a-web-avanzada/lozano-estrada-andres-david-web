'use client'

import { HeaderProps } from "@/app/padlet/types/headerProps";
import localFont from "next/font/local";

const alps = localFont({ src: '../../fonts/alps.woff2' });

export default function Header(
    props: HeaderProps
) {
    const { user, authors, time, title } = props;
    const { userName } = user;

    return (
        <>
            {/* LOGO */}
            <a
                href={ '/login' }
                className={ 'cursor-pointer absolute top-[18px] start-5 w-12 h-3 leading-3' }
            >
                <img
                    className={ 'w-full h-full hover:hover:opacity-100 transition-opacity opacity-[0.38]' }
                    src={ '/icons/padlet.svg' }
                    alt={ 'Logo' }
                />
            </a>

            <div className={ 'mt-9 flex justify-start pb-4' }>
                <div className={ 'flex flex-shrink-0 items-center justify-center ' +
                        'box-content lg:min-w-[72px] md:min-w-[40px] sm:min-w-[20px]' }
                />
                <div className={ 'max-w-[85%] lg:mt-[22px] md:mt-[14px] sm:mt-[14px]' }>
                    <div className={ 'flex space-s-0.75 font-sans text-dark-text-200 text-12-14' }>
                        {/* USER NAME */}
                        <a
                            className={ 'text-xs text-gray-600 hover:text-gray-800 ' +
                                'hover:focus-visible:text-gray-600 focus-ring:light hover:underline ' + alps.className }
                            style={{ lineHeight: '14px' }}
                        >
                            { userName }
                        </a>

                        {/* AUTHORS */}
                        {
                            authors !== undefined ?
                                <div className={ 'ml-[6.5px] align-middle text-xs text-gray-600 hover:text-gray-800 ' +
                                    'hover:focus-visible:text-gray-600 -mt-0.5 focus-ring:light ' +
                                    alps.className }>
                                    +
                                    <span className={ 'align-middle ml-1 hover:underline' }>
                                        { authors?.length }
                                    </span>
                                </div>
                            : ''
                        }

                        {/* TIME */}
                        <div className={ 'flex ml-[3px] h-[15px] -mt-px ' + alps.className }>
                            <span
                                className={ 'text-xs max-h-[15px] align-baseline text-gray-500' }
                                style={{ lineHeight: '14px' }}
                            >
                                &nbsp;•&nbsp;
                            </span>
                            <time className={ 'text-xs text-gray-500' }>{ time }</time>
                        </div>
                    </div>

                    {/* TITLE */}
                    <h1
                        className={ 'mt-0.5 min-h-[38px] font-sans text-surface-title font-semibold ' +
                            'break-words text-2xl text-black ' + alps.className }
                        style={{ lineHeight: '30px', letterSpacing: '-0.0255em' }}
                    >
                        { title }
                    </h1>
                </div>
            </div>
        </>
    )
}