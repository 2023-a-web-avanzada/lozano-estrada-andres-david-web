import { PostForm } from "@/app/padlet/types/postForm";

export type PanelProps = {
    onHide: () => undefined,
    onAddPost: (post: PostForm) => undefined
}