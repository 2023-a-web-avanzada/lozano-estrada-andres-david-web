// ../discord/app/_global_components/user_main_message.component.tsx

export type UserMainMessageProperties = {
    userName: string,
    userPhotoPath: string,
    messageDate: Date,
    message: string,
};

export default function UserMainMessage(
    properties: UserMainMessageProperties,
) {
    const { userName, userPhotoPath, messageDate, message } = properties;

    return (
        <>
        </>
    )
}