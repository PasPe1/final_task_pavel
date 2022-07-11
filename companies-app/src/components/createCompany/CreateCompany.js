import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCreateCompany } from '../../service/company/CompanyService';
import request from '../../hooks/request';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import classes from './createCompany.module.scss';
import Message from '../UI/message/Message';

const CreateCompany = () => {

    const [ companyInfo , setCompanyInfo] = useState({
        adress: "",
        description: "",
        name: "",
        number: "",
        service: "",
        type: ""
    })

    const [filled, sestFilled] = useState(false);

    const dispatch = useDispatch();
    const user = localStorage.getItem("user")
    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    const handleChangeInfo = (e) => {
        setCompanyInfo({...companyInfo, [e.target.name] : e.target.value, profile_id: JSON.parse(user).id})
    }

    const addCompany = (e) => {
        e.preventDefault()

        dispatch(fetchCreateCompany(request, companyInfo, (arg) => sestFilled(arg)))

        setCompanyInfo({
            adress: "",
            description: "",
            name: "",
            employeesCount: "",
            service: "",
            type: ""
        });
    }
    
    return (
        <div className={classes.createCompany_wrapper}>
            <form onSubmit={addCompany}>
                <Input type='text' name='name' placeholder='Name' minlength="3" maxlength="30" required  value={companyInfo.name} onChange={handleChangeInfo}/>
                <Input type='adress' name='adress' placeholder='Adress' minlength="3" maxlength="30" required value={companyInfo.adress} onChange={handleChangeInfo}/>
                <Input type='text' name='service' placeholder='Service' minlength="3" maxlength="30" required value={companyInfo.service} onChange={handleChangeInfo}/>
                <Input type='number' name='employeesCount' placeholder='Employees' minlength="3" maxlength="30" required value={companyInfo.employeesCount} onChange={handleChangeInfo}/>
                <textarea type='text' name='description' placeholder='Description' pattern=".{3,}" title="3 characters minimum" required value={companyInfo.description} onChange={handleChangeInfo}/>
                <Input type='text' name='type' placeholder='Type' minlength="3" maxlength="30" required value={companyInfo.type} onChange={handleChangeInfo}/>
                <Button disabled={loading === 'loading'} type='submit'>Create Company</Button>
                {filled ? <Message text={'All inputs must be are filled'}/> : null}
            </form>
        </div>
    )
}

export default CreateCompany;