import { UserProps } from "@/app/padlet/types/userProps";

export type PostProps = {
    author: UserProps,
    topic?: string,
    content?: string,
}