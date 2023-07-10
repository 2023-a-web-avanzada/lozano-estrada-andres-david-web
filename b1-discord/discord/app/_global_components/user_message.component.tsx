// ../discord/app/_global_components/user_message.component.tsx

import {UserSimpleMessageProperties} from "@/app/_global_components/user_simple_message.component";
import {UserMainMessageProperties} from "@/app/_global_components/user_main_message.component";

type UserMessageProperties = {
    userMainMessage: UserMainMessageProperties,
    userSimpleMessages?: UserSimpleMessageProperties[],
};

export default function UserMainMessage(
    properties: UserMessageProperties,
) {
    const { userMainMessage, userSimpleMessages } = properties;

    return (
        <>
            <div className={ "flex items-center bg-white" }>

            </div>
        </>
    )
}