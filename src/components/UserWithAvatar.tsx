import React from "react";
import { User } from "../api";

interface UserAvatarProps {
    user: User;
}

export const UserWithAvatar: React.FC<UserAvatarProps> = ({ user: { avatar_url, login } }) => {

    return (
        <div>
            <a href={`https://github.com/${login}`}>
                <img src={avatar_url} alt={`user ${login}`} />
            </a>
            <span>{login}</span>
        </div>
    );
};