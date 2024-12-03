import './header.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/userDataSlice.js';
import { logoutTrips } from '../../redux/slices/tripsDataSlice.js';
import { stringToUrlFormat } from '../../utils/common.utils.js';
import { userPages, guestPages } from './constants.js';
import HeaderLeft from './HeaderLeft';
import HeaderDrawer from './HeaderDrawer';
import HeaderRight from './headerRight.jsx';
import { tripsDataApi } from '../../redux/rtk/tripsDataApi.js';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState();
    const token = useSelector((state) => state.userData.token);
    const pages = token ? userPages : guestPages;

    const handleNavigate = (page) => {
        if (page === 'Logout') {
            dispatch(logoutUser());
            dispatch(logoutTrips());
            dispatch(tripsDataApi.util.resetApiState()); //apparently this is necessary to reset the state of the api slice
            console.log('Logged out');
        } else {
            navigate(`/${stringToUrlFormat(page)}`);
        }
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="header-container">
            <HeaderLeft toggleDrawer={toggleDrawer} />
            <nav className="navbar">
                {pages.map((page) => (
                    <button key={page} className="nav-button" onClick={() => handleNavigate(page)}>
                        <p>{page}</p>
                    </button>
                ))}
            </nav>
            <HeaderRight />
            <HeaderDrawer open={open} toggleDrawer={toggleDrawer} />
        </div>
    );
}

export default Header;
