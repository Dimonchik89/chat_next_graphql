import { useEffect, createRef } from 'react';
import { messages } from '../../store/message';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Message from '../message/Message';
import chat from "../../styles/chat.module.scss";

const ChatMessage = ({messages}) => {
  const chatMessage = createRef(null);

  const content = messages?.map((item, i) => <Message key={i} message={item}/>)

  useEffect(() => {
    const scrollHeight = chatMessage.current.scrollHeight;
    const height = chatMessage.current.getBoundingClientRect().height;
    const maxScrollTop = scrollHeight - height;
    
    chatMessage.current.scrollTop = maxScrollTop > 0 ? scrollHeight : 0;
  }, [messages])

  return (
    <div className={chat.chat__message} ref={chatMessage}>
      {content}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  messages
})

export default connect(mapStateToProps)(ChatMessage);