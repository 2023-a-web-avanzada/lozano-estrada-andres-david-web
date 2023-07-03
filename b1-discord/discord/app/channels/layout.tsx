import { Inter } from 'next/font/google'
import MenuContainer from "@/app/_global_components/menu_container";
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex min-h-screen">
                    <MenuContainer/>
                    {children}
                </div>
            </body>
        </html>
    )
}
