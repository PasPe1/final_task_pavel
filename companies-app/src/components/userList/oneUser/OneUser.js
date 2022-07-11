import Button from '../../UI/button/Button';
import classes from './oneUser.module.scss';

const OneUser = ({prop, onDelete, index}) => {

    return (
        <div className={classes.user_wrapper}>
            <div className={classes.user_name}>
                <h2>{index+1}.{prop.nick_name.length <= 6 ? prop.nick_name : prop.nick_name.substring(0, 6)+'...'}</h2>
            </div>
            <p>{prop.first_name.length <= 10 ? prop.first_name : prop.first_name.substring(0, 10)+'...'}</p>
            <p>{prop.last_name.length <= 10 ? prop.last_name : prop.last_name.substring(0, 10)+'...'}</p>
            <p>{prop.email.length <= 10 ? prop.email : prop.email.substring(0, 10)+'...'}</p>
            <p>{prop.phone_number.length <= 10 ? prop.phone_number : prop.phone_number.substring(0, 10)+'...'}</p>
            <p>{prop.description.length <= 10 ? prop.description : prop.description.substring(0, 10)+'...'}</p>
            <p>{prop.position.length <= 10 ? prop.position : prop.position.substring(0, 10)+'...'}</p>
            <p>{prop.role.length <= 10 ? prop.role : prop.role.substring(0, 10)+'...'}</p>
            <Button onClick={(e) => onDelete(e)}>Delete</Button>
            
        </div>
    )
}

export default OneUser;