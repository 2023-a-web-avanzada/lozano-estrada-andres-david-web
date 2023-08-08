import { UserProps } from "./userProps";

export type PostProps = {
    postId: string,
    author: UserProps,
    topic?: string,
    content?: string,
    usersWhoLiked: string[],
    creationDate: Date,
    onDelete: () => undefined,
    onLike:() => undefined
}