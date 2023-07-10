// ../discord/app/_global_components/user_simple_message.component.tsx

export type UserSimpleMessageProperties = {
    messageDate: Date,
    message: string,
};

export default function UserSimpleMessage(
    properties: UserSimpleMessageProperties,
) {
    const { messageDate, message } = properties;

    return (
        <>
        </>
    )
}