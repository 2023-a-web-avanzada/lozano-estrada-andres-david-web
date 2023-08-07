'use client'

import localFont from "next/font/local";
import {UserProps} from "@/app/padlet/types/userProps";

const oricons = localFont({ src: '../../fonts/oricons.woff2' });

export default function NavMenu(
    props: UserProps
) {
    const { userName, userImagePath } = props;

    return (
        <>
            <div className={ 'flex items-center flex-col space-y-4 justify-start box-border h-full py-4' }>
                <div className={ 'flex items-center justify-center w-10 h-10 px-1 rounded-2xl ' +
                    'bg-opacity-0 hover:bg-opacity-20 bg-gray-600' }>
                    <img
                        className={ 'rounded-full max-w-[24px]' }
                        src={ `/users/${ userImagePath }` }
                        alt={ userName }
                    />
                </div>

                <div className={ 'cursor-pointer flex items-center justify-center h-10 w-10 mt-4 px-1 rounded-2xl ' +
                        'bg-opacity-10 hover:bg-opacity-20 bg-gray-600' }>
                    <i
                        className={ 'font-normal text-bases not-italic ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        share_arrow_outline
                    </i>
                </div>

                <div className={ 'cursor-pointer flex items-center justify-center h-10 w-10 mt-4 px-1 rounded-2xl ' +
                        'bg-opacity-10 hover:bg-opacity-20 bg-gray-600' }>
                    <i
                        className={ 'font-normal text-bases not-italic ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        arrow_2_rectangular_clockwise_thin
                    </i>
                </div>

                <div className={ 'cursor-pointer flex items-center justify-center h-10 w-10 mt-4 px-1 rounded-2xl ' +
                        'bg-opacity-10 hover:bg-opacity-20 bg-gray-600' }>
                    <i
                        className={ 'font-normal text-bases not-italic ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        bell
                    </i>
                </div>

                <div className={ 'cursor-pointer flex items-center justify-center h-10 w-10 mt-4 px-1 rounded-2xl ' +
                        'bg-opacity-10 hover:bg-opacity-20 bg-gray-600' }>
                    <i
                        className={ 'font-normal text-bases not-italic ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        play_outline
                    </i>
                </div>

                <div className={ 'cursor-pointer flex items-center justify-center h-10 w-10 mt-4 px-1 rounded-2xl ' +
                        'bg-opacity-10 hover:bg-opacity-20 bg-gray-600' }>
                    <i
                        className={ 'font-normal text-bases not-italic ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        gear_outline
                    </i>
                </div>

                <div
                    className={ 'cursor-pointer flex items-center justify-center h-10 w-10 mt-4 px-1 rounded-2xl ' +
                        'bg-opacity-0 hover:bg-opacity-20 bg-gray-600' }
                    style={{ lineHeight: '1' }}
                >
                    <i
                        className={ 'flex items-center font-normal tracking-normal ' +
                            'text-2xl h-6 w-6 not-italic ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        dot_3_horizontal
                    </i>
                </div>
            </div>
        </>
    )
}