import React from "react";

function Message({ sender, content, isOwnMessage }) {
    return (
        <div>
            <span>{sender}</span>
            <p>{content}</p>
        </div>
    );
}

export default Message;
