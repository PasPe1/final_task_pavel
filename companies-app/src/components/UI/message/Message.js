
import classes from './errorMessage.module.scss';

const Message = ({text}) => {
    return (
        <div className={classes.error_message}>
            {text}
        </div>
    )
}

export default Message;