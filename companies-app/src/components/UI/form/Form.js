import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import Button from "../button/Button";
import Input from "../input/Input";
import Message from "../message/Message";

import classes from './form.module.scss';

const Form = ({submit, changePassword, userInfo, handleChangeInfo, active, saved, handlerPhone, keyPressPhone}) => {

    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    const handlerSub = (e) => {
        e.preventDefault();
        submit(e);
    }

    return (
        <div className={active ? classes.form_active : classes.form}>
            <form onSubmit={handlerSub}>
            <label >Name: </label><Input type="text" name='first_name' placeholder='first name' minlength="3" maxlength="30" required value={userInfo.first_name} onChange={handleChangeInfo}/>
            <label >Surname: </label><Input type="text" name='last_name' placeholder='last name' minlength="3" maxlength="30" required value={userInfo.last_name} onChange={handleChangeInfo}/>
            <label >Nickname: </label><Input type="text" name='nick_name' placeholder='Nickname' minlength="3" maxlength="30" required value={userInfo.nick_name} onChange={handleChangeInfo}/>
            <label >Email: </label><Input type="email" name='email' placeholder='Email' minlength="3" maxlength="30" required value={userInfo.email} onChange={handleChangeInfo}/>
            <label >Password: </label>
            <Button onClick={changePassword} type="button">change password</Button>
            <label >Phone number: </label><Input type="tel" name='phone_number' placeholder='Phone number' minlength="12" maxlength="19" pattern=".{12,}" title="12 characters minimum" required value={userInfo.phone_number} onChange={handlerPhone} onKeyDown={keyPressPhone}/>
            <label >Description: </label><textarea type="text" name='description' placeholder='Description' minlength="3" maxlength="300" pattern=".{3,}" title="3 characters minimum" required value={userInfo.description} onChange={handleChangeInfo}/>
            <label >Position: </label><Input type="text" name='position' placeholder='Position' minlength="3" maxlength="30" required value={userInfo.position} onChange={handleChangeInfo}/>
                <Button disabled={loading === 'loading'} type='submit'>Save</Button>
                {loading === 'loading' ? <Spinner/> : null}
                {loading === 'error' ? <Message text={'Error, check info or internet connection'}/> : null}
                {saved ? <Message text={'Saved!'}/> : null}
            </form>
        </div>
    )
}

export default Form;