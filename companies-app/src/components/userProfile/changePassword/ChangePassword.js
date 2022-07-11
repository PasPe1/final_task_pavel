import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import request from "../../../hooks/request";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import classes from './changePassword.module.scss'
import { fetched, fetching, fetchingError } from '../userSlice';
import Spinner from '../../UI/spinner/Spinner';
import Message from '../../UI/message/Message';


const ChangePassword = ({logout}) => {

    const [passwordState, setPasswordState] = useState({"oldpassword": '', "password": ''})
    const userId = localStorage.getItem('user');
    const dispatch = useDispatch();
    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    

    const handlePassword = (e) =>{
        setPasswordState({...passwordState, [e.target.name] : e.target.value , id: JSON.parse(userId).id})
    }

    const onChangePassword = (e) => {
        e.preventDefault();
        dispatch(fetching())
        const token = localStorage.getItem("AccesToken")
        request(`http://localhost:3005/user/password`, "PUT", JSON.stringify(passwordState), {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          })
        .then(data => {logout(); dispatch(fetched())})
        .catch(e => {dispatch(fetchingError())})
    }

    return (
        <div className={classes.password_wrapper}>
            <form onSubmit={onChangePassword}>
                <label>New password: </label><Input type="password" name="password" placeholder="new password" minlength="8" maxlength="30" value={passwordState.password} onChange={handlePassword}></Input>
                <Button disabled={loading === 'loading'} type='submit'>Change password</Button>
                {loading === 'loading' ? <Spinner/> : null}
                {loading === 'error' ? <Message text={'Check internet connection'}/> : null}
            </form>
        </div>
    )
}

export default ChangePassword;