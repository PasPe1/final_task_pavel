import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import request from '../../hooks/request';

import Input from '../../components/UI/input/Input';
import Button from '../../components/UI/button/Button';

import classes from './singleUserLayout.module.scss';
import { fetchUpdateUser, fetchUserSingle } from '../../service/user/UserService';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/spinner/Spinner';
import Message from '../../components/UI/message/Message';


const SingleUserLayout = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    const [saved, setSaved] = useState(false);
    const [userInfo, setUserInfo] = useState({
        "img": "",
        "email": "",
        "id": "",
        "last_name": "",
        "first_name": "",
        "nick_name": "",
        "phone_number": "",
        "description": "",
        "position": "",
        "role": ""
    })

    const keyPressPhone = (e) => {
        const input = e.target
        if (e.keyCode === 8 && getInputNumbersValue(input).length <= 1) {
            input.value = "";
        }
        if (e.keyCode === 8 && getInputNumbersValue(input).length === 5) {
            input.value = getInputNumbersValue(input).substring(0, 6);
        }
        setUserInfo({...userInfo, [e.target.name] : input.value, id: userInfo.id, img: "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg"})
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
        setUserInfo({...userInfo, [e.target.name] : input.value, id: userInfo.id, img: "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg"})
    }

    const handleChangeInfo = (e) => {
        setUserInfo({...userInfo, [e.target.name] : e.target.value , id: userInfo.id, img: "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg"})
    }

    useEffect(() => {
        dispatch(fetchUserSingle(request, id, (arg) => setUserInfo(arg)))
    }, [id]);

    const updateUserInfo = (e) => {
        e.preventDefault();
        dispatch(fetchUpdateUser(request, userInfo, (arg) => setSaved(arg)));
    }

    return (
        <div className={classes.single_user}>
            <h2>User: {userInfo.id}</h2>
            <div className={classes.single_companyuser_about}>
            <form onSubmit={updateUserInfo}>
            <label >Nickname: </label><Input type="text" name='nick_name' placeholder='Nickname' minlength="3" maxlength="30" required value={userInfo.nick_name} onChange={handleChangeInfo}/>
            <label >First name: </label><Input type="text" name='first_name' placeholder='first name' minlength="3" maxlength="30" required value={userInfo.first_name} onChange={handleChangeInfo}/>
            <label >Last name: </label><Input type="text" name='last_name' placeholder='last name' minlength="3" maxlength="30" required value={userInfo.last_name} onChange={handleChangeInfo}/>
            <label >Email: </label><Input type="email" name='email' placeholder='Email' minlength="3" maxlength="30" required value={userInfo.email} onChange={handleChangeInfo}/>
            <label >Phone number: </label><Input type="tel" name='phone_number' placeholder='Phone number' minlength="12" maxlength="19" pattern=".{12,}" title="12 characters minimum" required value={userInfo.phone_number} onChange={handlerPhone} onKeyDown={keyPressPhone}/>
            <label >Description: </label><textarea type="text" name='description' placeholder='Description' minlength="3" maxlength="300" pattern=".{3,}" title="3 characters minimum" required value={userInfo.description} onChange={handleChangeInfo}/>
            <label >Position: </label><Input type="text" name='position' placeholder='Position' minlength="3" maxlength="30" required value={userInfo.position} onChange={handleChangeInfo}/>
            <label >Role: </label><Input type="text" name='role' placeholder='Role' minlength="3" maxlength="30" required value={userInfo.role} onChange={handleChangeInfo}/>
            <label >id: </label><p>{userInfo.id}</p>
                <Button disabled={loading === 'loading'} type='submit'>Save</Button>
            {loading === 'loading' ? <Spinner/> : null}
            {loading === 'error' ? <Message text={`Error. All inputs must be are filled or check internet connection`}/> : null}
            {saved ? <Message className={classes.massage_save} text={`Saved!`}/> : null}
            </form>
            </div>
        </div>
    )
}

export default SingleUserLayout;