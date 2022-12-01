import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import Link from "next/link";
import chat from "../../styles/chat.module.scss";

const Chat = () => {
    return (
        <div className={chat.chat}>
            <ChatMessage/>
            <ChatForm/>
        </div>
    )
}
export default Chat;