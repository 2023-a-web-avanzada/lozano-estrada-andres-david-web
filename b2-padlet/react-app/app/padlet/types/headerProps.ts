import { UserProps } from "@/app/padlet/types/userProps";

export type HeaderProps = {
    user: UserProps,
    authors?: [UserProps],
    time?: string,
    title: string,
}