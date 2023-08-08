import { UserProps } from "@/app/padlet/types/userProps";

export type PostProps = {
    postId: string,
    author: UserProps,
    topic?: string,
    content?: string,
    likes: number,
    creationDate: Date,
    onDelete: () => undefined
}