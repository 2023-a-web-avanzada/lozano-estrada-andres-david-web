'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
            const redirectTimer = setTimeout(() => {
                router.push("/channels/messages");
            }, 4000);

            return () => clearTimeout(redirectTimer);
        },
        [router],
    );

    return (
        <>
            <main className="">
                <h1>Redirecting...</h1>
            </main>
        </>
    )
}