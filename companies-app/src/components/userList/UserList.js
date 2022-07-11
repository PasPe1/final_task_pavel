import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import request from '../../hooks/request';
import OneUser from './oneUser/OneUser';
import Pagination from '../UI/pagination/Pagination';

import classes from './userList.module.scss';
import { deleteUser, fetchAllUser, fetchOptionSortUser } from '../../service/user/UserService';
import Spinner from '../UI/spinner/Spinner';
import Message from '../UI/message/Message';


const UserList = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(8);

    const dispatch = useDispatch();

    const usersList = useSelector(state => state.userSlice.users)
    const loading = useSelector(state => state.userSlice.userLoadingStatus)

    useEffect(() => {
        dispatch(fetchAllUser(request));
    }, [])

    const onDelete = useCallback((id, e) => {
        e.stopPropagation();
        e.preventDefault();
        const adminUser = localStorage.getItem('user');
        if (JSON.parse(adminUser).id === id) { return alert("You cannot delete yours profile")}
        dispatch(deleteUser(request, id));
    }, []);

    function renderItems(arr) {
        const items = arr.map((user, i) => {
        return (
            <li className="company_item" key={i}>
                <Link to={`/user/${user.id}`}>
                    <OneUser key={user.id} prop={user} onDelete={(e) => onDelete(user.id, e)} index={i}/>
                </Link>
            </li>
        )
        })

        return (
            <ul className={classes.users_col}>
                {items}
            </ul>
        )
    }

    const options = [
        { value: 'all', label: 'none' },
        { value: 'byName', label: 'name>' },
        { value: 'byId', label: 'id<' }
        ];

    const onSelectedOption = (selectedOption) => {
        if (selectedOption === null) {
            return
        }
        dispatch(fetchOptionSortUser(request, selectedOption));
      }

    useEffect(() => {
        onSelectedOption(selectedOption)
    }, [selectedOption])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = usersList.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className={classes.users_wrapper}>
            <div className={classes.users_information}>
                <p>Nickname</p>
                <p>first name</p>
                <p>last name</p>
                <p>email</p>
                <p>phone number</p>
                <p>description</p>
                <p>position</p>
                <p>role</p>
                <Select options = {options} 
                defaultValue={selectedOption}
                onChange={setSelectedOption}/>
            </div>
            {loading === 'loading' ? <Spinner/> :
            <div>
            {usersList?.length !== 0 
                ?   renderItems(currentPosts)
                : <div className={classes.no_elements}>No one users in your site</div>
            }
            </div>}
            {loading === 'error' ? <Message text={'Check your internet connection'}/> : null}
            {usersList.length !== 0 
                ?   <div className={classes.pagination_button}>
                        {<Pagination postsPerPage={postsPerPage} length={usersList.length} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
                    </div>
                : null
            }
        </div>
    )
}

export default UserList;