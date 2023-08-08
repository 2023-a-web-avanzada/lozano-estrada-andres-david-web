import { UserProps } from "./userProps";

export type PostProps = {
    postId: string,
    author: UserProps,
    topic?: string,
    content?: string,
    likes: number,
    creationDate: Date,
    onDelete: () => undefined
}