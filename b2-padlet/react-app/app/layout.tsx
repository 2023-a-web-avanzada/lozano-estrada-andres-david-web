'use client'

import { ContextContainer } from "@/app/context/ContextContainer";
import { ContextObject } from "@/app/context/types/contextObject";
import { useState } from "react";
import type { Metadata } from 'next'
import './globals.css'
import React from "react";

export const metadata: Metadata = {
  title: 'Padlet',
  description: 'Creado por Andrés Lozano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    // Context
    const [ padletId, setPadletId ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ userImagePath, setUserImagePath ] = useState('');

    const contextObject: ContextObject = {
        padletId,
        userName,
        userImagePath,
        setPadletId,
        setUserName,
        setUserImagePath
    };

    return (
        <html lang="en">
            <body>
                <ContextContainer.Provider value={ contextObject }>
                    { children }
                </ContextContainer.Provider>
            </body>
        </html>
    )
}
