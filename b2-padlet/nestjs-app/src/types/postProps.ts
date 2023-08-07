import { UserProps } from "./userProps";

export type PostProps = {
    author: UserProps,
    topic?: string,
    content?: string,
}