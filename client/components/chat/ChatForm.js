import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import chat from "../../styles/chat.module.scss";
import { CREATE_MESSAGE } from '../../api/messageApi';
import { useMutation } from '@apollo/client';
import { user } from '../../store/user';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect } from 'react';

const ChatForm = ({user}) => {
    const [message, setMessage] = useState("")
    const [createMessage] = useMutation(CREATE_MESSAGE)

    const sendMessage = (e) => {
        e.preventDefault()
        createMessage({
            variables: {
                inputMessage: {
                    user,
                    body: message
                }
            }
        })
        setMessage("")
    }

    return (
        <div>
            <Form 
                className={chat.chat__form}
                onSubmit={e => sendMessage(e)}
            >
                <Form.Group className={chat.chat__input} >
                    <Form.Control 
                        type="text" 
                        placeholder="Message" 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form> 
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    user
})

export default connect(mapStateToProps)(ChatForm);