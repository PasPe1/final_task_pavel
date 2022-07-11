import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AboutUs from '../aboutUs/AboutUs';
import SingleCompanyLayout from '../../pages/singleCompanyLayout/SingleCompanyLayout.js';
import NavBar from '../navBar/NavBar';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';
import UserProfile from '../userProfile/Userprofile';
import ChangePassword from '../userProfile/changePassword/ChangePassword';
import UserList from '../userList/UserList';
import SingleUserLayout from '../../pages/singleUserLayout/SingleUserLayout';
import CompaniesList from '../companiesList/CompaniesList';
    
const Rout = () => {

    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const enter = localStorage.getItem("user");
        enter ? setUser(true) : setUser(false)
    }, []);

    const logout = () => {
        setUser(false)
        setAdmin(false)
        localStorage.clear('AccesToken')
        localStorage.clear('user')
    }

    return (
        <div>
            <Router>
                    <NavBar logout={() => logout()} admin={admin} setAdmin={() => setAdmin(true)}/>
                <Routes>
                    <Route path='/signUp' element={<SignUp/>}/>
                    <Route path='/home' element={<AboutUs/>}/>
                    {!user && (
                        <Route exact path='/' element={<SignIn authenticate={() => setUser(true)} setAdmin={() => setAdmin(true)}/>}/>

                    )}
                    {user && (
                        <>
                        <Route path='/profile' element={<UserProfile/>}/>
                        <Route path='/company/:id' element={<SingleCompanyLayout/>}/>
                        <Route key='/companies' path='/companies' element={<CompaniesList/>}/>
                        <Route path='/password' element={<ChangePassword logout={() => logout()}/>}/>
                        </>
                    )}
                    {admin && (
                        <>
                        <Route key='/allcompanies' path='/allcompanies' element={<CompaniesList admin={admin}/>}/>
                        <Route path='/alluser' element={<UserList/>}/>
                        <Route path='/user/:id' element={<SingleUserLayout/>}/>
                        </>
                    )}
                    <Route path='*' element={<Navigate to={user ? "/profile" : "/"}/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default Rout;