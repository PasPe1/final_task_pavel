import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../UI/button/Button';

import classes from './navBar.module.scss';

const NavBar = ({logout, admin, setAdmin}) => {

    useEffect(() => {
        const u = localStorage.getItem('user')
        if (JSON.parse(u)?.role === 'ADMIN') {
            setAdmin()
        }
    }, [])

    return (
        <div className={classes.header_wrapper}>
            <img className={classes.moon} src='https://cdn4.buysellads.net/uu/1/50174/1564282856-carbon.png' alt='circle pastel moon'/>
            <div className={classes.header_logo}><NavLink to='/home'>Lanif</NavLink></div>
            <nav>
                <ul className={classes.header_list}>
                    <li><NavLink className={({isActive}) => isActive ? classes.active: "non-active-class" } to="/companies">companies</NavLink></li> 
                    <li><NavLink className={({isActive}) => isActive ? classes.active: "non-active-class" } to="/profile">my profile</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? classes.active: "non-active-class" } to="/home">about us</NavLink></li>
                    {admin ? <li><NavLink className={({isActive}) => isActive ? classes.active: "non-active-class" } to="/allcompanies">all companies</NavLink></li> : null}
                    {admin ? <li><NavLink className={({isActive}) => isActive ? classes.active: "non-active-class" } to="/alluser">all user</NavLink></li> : null}
                </ul>
            </nav>
            <Button onClick={logout}>Logout</Button>
                <div className={classes.header_logo_sec}>Lanif</div>
        </div>
    )
}

export default NavBar;