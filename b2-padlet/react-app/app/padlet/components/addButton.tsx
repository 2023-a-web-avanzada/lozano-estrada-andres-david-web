'use client'

import localFont from "next/font/local";
import { useState } from "react";
import { AddButtonProps } from "@/app/padlet/types/addButtonProps";

const oricons = localFont({ src: '../../fonts/oricons.woff2' });

export default function AddButton(
    props: AddButtonProps
) {
    const { onClick } = props;

    const [ isHovered, setIsHovered ] = useState(false);

    const handleOnMouseEnter = () => {
        setIsHovered(true);
    };

    const handleOnMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <div
                className={ 'cursor-pointer fixed flex items-center justify-center rounded-full bg-[#111111] ' +
                    'bottom-6 end-11 h-[56px] w-[56px]' }
                onMouseEnter={ handleOnMouseEnter }
                onMouseLeave={ handleOnMouseLeave }
                title={ 'Añadir publicación' }
                onClick={ onClick }
            >
                <div className={ 'flex items-center rotate-180 justify-center h-6 w-6' }>
                    <i className={ 'flex items-center justify-center text-2xl h-6 ' +
                        'w-6 not-italic ' + oricons.className + ' transition-transform transform ' +
                        (isHovered ? 'rotate-180' : 'rotate-90') }
                    >
                        { !isHovered  ? 'plus_thick' : 'pencil_filled' }
                    </i>
                </div>

                {/* FLOAT WINDOW */}
                {
                    isHovered ?
                        <div
                            className={ 'absolute rounded-lg px-3 py-2 left-[-328px] mr-16' }
                            style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                        >
                            <p
                                className={ 'text-sm' }
                                style={{ letterSpacing: '-0.006em' }}
                            >
                                Haz clic en cualquier lugar, arrastra archivos, pega contenido del
                                portapapeles o haz clic aquí para publicar.
                            </p>
                        </div>
                    : ''
                }
            </div>
        </>
    )
}