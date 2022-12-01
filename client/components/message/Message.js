import { user } from "../../store/user";
import messageStyle from "../../styles/message.module.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

const Message = ({message, user}) => {

    const styleMessage = user === message.user ? messageStyle.message__user : messageStyle.message;

    return (
        <div className={styleMessage}>
            <div className={messageStyle.message__container}>
                <div className={messageStyle.message__avatar}>
                    {message.user.slice(0, 2).toUpperCase()}
                </div>
                <div className={messageStyle.message__wrapper}>
                    <div className={messageStyle.message__content}>
                        <p className={messageStyle.message__user}>{message.user}</p>
                        <p className={messageStyle.message__text}>{message.body}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user
})

export default connect(mapStateToProps)(Message);