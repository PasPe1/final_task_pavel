import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import request from '../../hooks/request';
import Input from '../../components/UI/input/Input';
import Button from '../../components/UI/button/Button';

import classes from './singleCompanyLayout.module.scss';
import { fetchCompanySingle, fetchUpdateCompany } from '../../service/company/CompanyService';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/spinner/Spinner';
import Message from '../../components/UI/message/Message';

const SingleCompanyLayout = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    const [saved, setSaved] = useState(false);
    const [companyInfo, setCompanyInfo] = useState({
        "name": "",
        "adress": "",
        "service": "",
        "employeesCount": "",
        "description": "",
        "type": "",
        "id": "",
        "profile_id": ''
    })

    const handleChangeInfo = (e) => {
        setCompanyInfo({...companyInfo, [e.target.name] : e.target.value , id: companyInfo.id, profile_id: companyInfo.profile_id})
    }

    useEffect(() => {
        dispatch(fetchCompanySingle(request, id, (arg) => setCompanyInfo(arg)))
    }, [id]);

    const updateCompanyInfo = (e) => {
        e.preventDefault();
        dispatch(fetchUpdateCompany(request, id, companyInfo, (arg) => setSaved(arg)));
    }

    return (
        <div className={classes.single_company}>
            <h2>Company: {companyInfo.name}</h2>
            <div className={classes.single_company_about}>
            <form onSubmit={updateCompanyInfo}>
                <label >Name: </label><Input type="text" name='name' placeholder='name' minlength="3" maxlength="30" value={companyInfo.name} onChange={handleChangeInfo}/>
                <label >Adress: </label><Input type="text" name='adress' placeholder='adress' minlength="3" maxlength="30" value={companyInfo.adress} onChange={handleChangeInfo}/>
                <label >Service: </label><Input type="text" name='service' placeholder='service' minlength="3" maxlength="30" value={companyInfo.service} onChange={handleChangeInfo}/>
                <label >EmployeesCount: </label><Input type="number" name='employeesCount' minlength="3" maxlength="30" placeholder='employeesCount' value={companyInfo.employeesCount} onChange={handleChangeInfo}/>
                <label >Description: </label><textarea type="text" name='description' placeholder='description' minlength="3" maxlength="300" value={companyInfo.description} onChange={handleChangeInfo}/>
                <label >Type: </label><Input type="text" name='type' placeholder='type' minlength="3" maxlength="30" value={companyInfo.type} onChange={handleChangeInfo}/>
                <Button disabled={loading === 'loading'} type='submit'>Save</Button>
                {loading === 'loading' ? <Spinner/> : null}
                {loading === 'error' ? <Message text={'Error, check info or internet connection'}/> : null}
            </form>
            {saved ? <Message text={`Saved!`}/> : null}
            </div>
        </div>
    )
}

export default SingleCompanyLayout;