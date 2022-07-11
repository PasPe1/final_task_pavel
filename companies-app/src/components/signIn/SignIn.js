import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import request from '../../hooks/request';

import classes from './signIn.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignin } from '../../service/user/UserService';
import Spinner from '../UI/spinner/Spinner';
import Message from '../UI/message/Message';


const SignIn = ({ authenticate, setAdmin }) => {

    const [userOnEnter, setUserOnEnter] = useState({ email : ''})

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    const handleChangeUserOnEnter = (e) => {
        setUserOnEnter({ ...userOnEnter, [e.target.name] : e.target.value });
    }

    useEffect(() => {
        const role = localStorage.getItem('user')
        if (loading === 'idle' && role !== undefined) {
            if(JSON.parse(role)?.role === 'ADMIN') {
                setAdmin()
                navigate("profile")
                authenticate();
            } 
            if(JSON.parse(role)?.role === 'USER') {
                navigate("profile")
                authenticate();
            } 
        }
    }, [loading])

    const onEnter = async (e) => {
        e.preventDefault();
        dispatch(fetchSignin(request, userOnEnter))
    }

    return (
        <div className={classes.sign_in_wrapper}>
            <form onSubmit={onEnter}>
                <Input type="email" name='email' placeholder='Email' minlength="3" value={userOnEnter.email} onChange={handleChangeUserOnEnter}/>
                <Input type="password" name='password' placeholder='Password' minlength="8" value={userOnEnter.password} onChange={handleChangeUserOnEnter}/>
                <Button disabled={loading === 'loading'} type='submit'>Увійти</Button>
                {loading === 'loading' ? <Spinner/> : null}
                {loading === 'error' ? <Message text={'Error check correct email or password'}/> : null}
                <Link to='/signUp'>Sign Up</Link>
            </form>
        </div>
    )
}

export default SignIn;