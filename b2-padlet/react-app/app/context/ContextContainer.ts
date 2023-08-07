import { createContext } from "react";
import { ContextObject } from "@/app/context/types/contextObject";

export const ContextContainer = createContext(
    {} as ContextObject
)