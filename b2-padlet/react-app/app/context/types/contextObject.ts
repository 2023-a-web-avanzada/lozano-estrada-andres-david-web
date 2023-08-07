import { Dispatch, SetStateAction } from "react";

export interface ContextObject {
    padletId: string,
    userName: string,
    userImagePath: string,
    setPadletId: Dispatch<SetStateAction<string>>,
    setUserName: Dispatch<SetStateAction<string>>,
    setUserImagePath: Dispatch<SetStateAction<string>>
}