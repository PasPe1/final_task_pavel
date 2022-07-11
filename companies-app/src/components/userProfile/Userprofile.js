import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import request from '../../hooks/request';
import Button from '../UI/button/Button';

import classes from './userProfile.module.scss';
import { updateUser } from '../../service/user/UserService';
import { useDispatch } from 'react-redux';
import Form from '../UI/form/Form';

const UserProfile = () => {

    const [saved, setSaved] = useState(false);
    const [activeForm, setActiveForm] = useState(false);
    const [userInfo, setUserInfo] = useState({
        "img": "",
        "email": "",
        "id": "",
        "last_name": "",
        "first_name": "",
        "nick_name": "",
        "phone_number": "",
        "description": "",
        "position": ""
      })
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleChangeInfo = (e) => {
        setUserInfo({...userInfo, [e.target.name] : e.target.value , id: userInfo.id, img: "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg"})
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUserInfo(user);
    }, []);

    const updateUserInfo = (e) => {
        e.preventDefault();
        dispatch(updateUser(request, userInfo, (arg) => setSaved(arg)));
    }

    const changePassword = () => {
        navigate('/password')
    }

    const setForm = () => {
        if (activeForm) {
            setActiveForm(false)
        } else {
            setActiveForm(true)
        }
    }

    const keyPressPhone = (e) => {
        const input = e.target
        if (e.keyCode === 8 && getInputNumbersValue(input).length <= 1) {
            input.value = "";
        }
        if (e.keyCode === 8 && getInputNumbersValue(input).length === 5) {
            input.value = getInputNumbersValue(input).substring(0, 6);
        }
        setUserInfo({...userInfo, [e.target.name] : e.target.value , id: userInfo.id, img: "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg"})

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
        setUserInfo({...userInfo, [e.target.name] : e.target.value , id: userInfo.id, img: "https://galshir.com/img/brushes/gal-shir-brushes-before.jpg"})
    }

    return (
        <div className={classes.user_profile_wrapper}>
            <img src={userInfo.img} alt='user profile'/>
            <div className={classes.form_editor}>
            <div className={classes.user_profile_information}>
            <h3>Profile Information</h3>
            <p>Name: {userInfo.first_name}</p>
            <p>Surname: {userInfo.last_name}</p>
            <p>Nickname: {userInfo.nick_name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Phone number: {userInfo.phone_number}</p>
            <p>Description: {userInfo.description}</p>
            <p>Position: {userInfo.position}</p>
            </div>
            <Button onClick={() => setForm()}>Edit</Button>
            </div>
            {activeForm ? <div onClick={() => setActiveForm(false)} className={classes.overf}></div> : null}
                {activeForm ? 
                    <Form
                    submit={(e) => updateUserInfo(e)}
                    changePassword={changePassword}
                    userInfo={userInfo}
                    handleChangeInfo={handleChangeInfo}
                    alt={'user profile'}
                    close={() => setActiveForm(false)}
                    active={activeForm}
                    saved={saved}
                    handlerPhone={handlerPhone}
                    keyPressPhone={keyPressPhone}/>
                    : null
                }
        </div>
    )
}

export default UserProfile;