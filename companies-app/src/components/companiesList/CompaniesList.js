import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';

import { deleteCompany, fetchListCompany, fetchOptionSortCompany } from '../../service/company/CompanyService';
import Company from '../company/Company';
import CreateCompany from '../createCompany/CreateCompany';
import request from '../../hooks/request';
import classes from './companiesList.module.scss';
import Pagination from '../UI/pagination/Pagination';
import Spinner from '../UI/spinner/Spinner';
import Message from '../UI/message/Message';

const CompaniesList = ({admin}) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5);
    const [internetError, setInternetError] = useState(false)

    const location = useLocation();
    const dispatch = useDispatch();

    const companyList = useSelector(state => state.userSlice.companyList);
    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    useEffect(() => {
        const user = localStorage.getItem("user")
        let url = `allBy/${JSON.parse(user).id}`
        if (admin) {
            url = `all`
        }
        dispatch(fetchListCompany(request, url, (arg) => setInternetError(arg)));
    }, [location])

    const onDelete = useCallback((id, e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(deleteCompany(request, id));
    }, []);

    function renderItems(arr) {
        const items = arr.map((company, i) => {
        return (
            <li className="company_item" key={i}>
                <Link to={`/company/${company.id}`}>
                    <Company key={company.id} prop={company} onDelete={(e) => onDelete(company.id, e)} index={i}/>
                </Link>
            </li>
        )
        })

        return (
            <ul className={classes.companies_col}>
                {items}
            </ul>
        )
    }

    const options = [
        { value: 'all', label: 'none' },
        { value: 'byName', label: 'name>' },
        { value: 'byEmployees', label: 'employees>' },
        { value: 'byService', label: 'service>' }
        ];

    const onSelectedOption = (selectedOption) => {
        if (selectedOption === null) {
            return
        }
        dispatch(fetchOptionSortCompany(request, selectedOption))
    }

    useEffect(() => {
        onSelectedOption(selectedOption)
    }, [selectedOption])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = companyList.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className={classes.companies_wrapper}>
            <CreateCompany/>
            <div className={classes.companies_information}>
                <p>Name</p>
                <p>Adress</p>
                <p>Service</p>
                <p>Employees</p>
                <p>Description</p>
                <p>Type</p>
                <Select options = {options} 
                defaultValue={selectedOption}
                onChange={setSelectedOption}/>
            </div>
            {loading === 'loading' ? <Spinner/> 
            : 
            <div>
            {companyList.length !== 0 
                ?   renderItems(currentPosts)
                : <div className={classes.no_elements}>No one company in your company List</div>
            }
            </div>}
            {internetError ? <Message text={'Check your internet connection'}/> : null}

            {companyList.length !== 0 ?   
                <div className={classes.pagination_button}>
                    {<Pagination 
                    postsPerPage={postsPerPage} 
                    length={companyList.length} 
                    setCurrentPage={setCurrentPage} 
                    currentPage={currentPage}/>}
                </div>
            : 
                null
            }
        </div>
    )
}

export default CompaniesList;