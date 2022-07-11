import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import request from '../../hooks/request';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';

import classes from './signUp.module.scss';
import Spinner from '../UI/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignUp } from '../../service/user/UserService';
import Message from '../UI/message/Message';

const SignUp = () => {

    const [newUser, setNewUser] = useState({ email : ''})
    const [ signUpError, setSignUpError ] = useState(false)

    const loading = useSelector(state => state.userSlice.userLoadingStatus)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChangeTitle = (e) => {
        setNewUser({ ...newUser, [e.target.name] : e.target.value, img : "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg", role: 'USER'});
    }

    const addNewUser = (e) => {
        e.preventDefault();
        dispatch(fetchSignUp(request, navigate, newUser, () => setSignUpError(true)));
    }

    const keyPressPhone = (e) => {
        const input = e.target
        if (e.keyCode === 8 && getInputNumbersValue(input).length <= 1) {
            input.value = "";
        }
        if (e.keyCode === 8 && getInputNumbersValue(input).length === 5) {
            input.value = getInputNumbersValue(input).substring(0, 6);
        }
        setNewUser({ ...newUser, [e.target.name] : e.target.value, img : "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg", role: 'USER'});
    }

    const getInputNumbersValue = (input) => {
        return input.value.replace(/\D/g, "");
    }
    

    const handlerPhone = (e) => {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            formatedInputValue = "",
            firstSymbols = ""

        if (!inputNumbersValue) {
            formatedInputValue = input.value = "";
        }

        if (["3", "0"].indexOf(inputNumbersValue[0]) > -1) {
            // Ukraine number
            if (inputNumbersValue[0] === "0") {inputNumbersValue = "38"+inputNumbersValue};
            if (inputNumbersValue.length === 1) {
                firstSymbols = (inputNumbersValue[0] === "0") ? "+380" : "+3"
                formatedInputValue = firstSymbols + "";
            }
            if (inputNumbersValue.length > 3) {
                formatedInputValue +='+' + inputNumbersValue.substring(0, 3) + " (" + inputNumbersValue.substring(3, 5)
            }
            if (inputNumbersValue.length > 1 && inputNumbersValue.length <= 3) {
                formatedInputValue = '+' + inputNumbersValue;
            }
            if (inputNumbersValue.length >= 5) {
                formatedInputValue += ") " + inputNumbersValue.substring(5, 7)
            }
            if (inputNumbersValue.length >= 8) {
                formatedInputValue += "-" + inputNumbersValue.substring(7, 9)
            }
            if (inputNumbersValue.length >= 10) {
                formatedInputValue += "-" + inputNumbersValue.substring(9, 12)
            }
        } else {
            // not Ukraine number
            formatedInputValue = '+' + inputNumbersValue.substring(0, 18);
        }
        input.value = formatedInputValue;
        setNewUser({ ...newUser, [e.target.name] : e.target.value, img : "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg", role: 'USER'});
    }

    return (
        <div className={classes.sign_up_wrapper}>
            <form onSubmit={addNewUser}>
                <Input type="email" name='email' placeholder='Email' minlength="3" maxlength="50" required value={newUser.email} onChange={handleChangeTitle}/>
                <Input type="password" name='password' placeholder='Password' minlength="8" maxlength="30" required value={newUser.password} onChange={handleChangeTitle}/>
                <Input type="tel" name='phone_number' placeholder='Phone number' minlength="12" maxlength="19" pattern=".{12,}" title="12 characters minimum" required value={newUser.phone_number} onChange={handlerPhone} onKeyDown={keyPressPhone}/>
                <Input type="text" name='first_name' placeholder='last name' minlength="3" maxlength="30" required value={newUser.first_name} onChange={handleChangeTitle}/>
                <Input type="text" name='last_name' placeholder='first name' minlength="3" maxlength="30" required value={newUser.last_name} onChange={handleChangeTitle}/>
                <Input type="text" name='nick_name' placeholder='Nickname' minlength="3" maxlength="30" required value={newUser.nick_name} onChange={handleChangeTitle}/>
                <Input type="text" name='description' placeholder='Description' minlength="3" maxlength="300" required value={newUser.description} onChange={handleChangeTitle}/>
                <Input type="text" name='position' placeholder='Position' minlength="3" maxlength="30" required value={newUser.position} onChange={handleChangeTitle}/>
                <Button disabled={loading === 'loading'} type='submit'>Enter</Button>
                {loading === 'loading' ? <Spinner/> : null}
                {signUpError ? <Message text={'Email may be registered or server dont answer'}/> : null}
                <Link disabled={loading === 'loading'} to='/'>Sign In</Link>
            </form>
        </div>
    )
}

export default SignUp;