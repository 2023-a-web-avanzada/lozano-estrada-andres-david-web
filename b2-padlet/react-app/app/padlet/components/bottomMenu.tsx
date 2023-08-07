'use client'

import localFont from "next/font/local";
import {AddButtonProps} from "@/app/padlet/types/addButtonProps";

const oricons = localFont({ src: '../../fonts/oricons.woff2' });

export default function BottomMenu(
    props: AddButtonProps
) {
    const { onClick } = props;

    return (
        <>
            <div
                className={ 'flex items-center justify-around space-x-0 pt-1 pb-2' }
                onClick={ onClick }
            >
                <div className={ 'w-10 h-10 px-1 flex items-center justify-center' }>
                    <i
                        className={ 'flex items-center text-2xl not-italic max-w-[24px] ' +
                            'max-h-[24px] ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        share_arrow_outline
                    </i>
                </div>

                <div className={ 'w-10 h-10 px-1 flex items-center justify-center' }>
                    <i
                        className={ 'flex items-center text-2xl not-italic max-w-[24px] ' +
                            'max-h-[24px] ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        bell
                    </i>
                </div>

                {/* ADD BUTTON */}
                <div className={ 'cursor-pointer w-10 h-10 px-1 flex items-center justify-center' }>
                    <div
                        className={ 'flex items-center justify-center rounded-full w-8 h-8 bg-[#111111]' }
                    >
                        <i
                            className={ 'flex text-white items-center text-xl not-italic max-w-[20px] ' +
                                'max-h-[20px] ' + oricons.className }
                        >
                            plus_thick
                        </i>
                    </div>
                </div>

                <div className={ 'w-10 h-11 px-1 flex items-center justify-center' }>
                    <i
                        className={ 'flex items-center text-2xl not-italic max-w-[24px] ' +
                            'max-h-[24px] ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        search
                    </i>
                </div>

                <div className={ 'w-10 h-10 px-1 flex items-center justify-center' }>
                    <i
                        className={ 'flex items-center text-2xl not-italic max-w-[24px] ' +
                            'max-h-[24px] ' + oricons.className }
                        style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                        dot_3_horizontal
                    </i>
                </div>
            </div>
        </>
    )
}