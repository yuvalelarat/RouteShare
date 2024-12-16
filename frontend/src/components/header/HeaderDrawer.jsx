import Drawer from '@mui/material/Drawer';
import NavBarLogo from './NavBarLogo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userPages, guestPages } from './constants.js';
import { stringToUrlFormat } from '../../utils/common.utils.js';
import { logoutUser } from '../../redux/slices/userDataSlice.js';

// eslint-disable-next-line react/prop-types
function HeaderDrawer({ open, toggleDrawer }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const firstName = useSelector((state) => state.userData.firstName);
    const pages = firstName ? userPages : guestPages;

    const handleNavigate = (page) => {
        if (page === 'Logout') {
            dispatch(logoutUser());
            console.log('Logged out');
        } else {
            navigate(`/${stringToUrlFormat(page)}`);
        }
    };

    return (
        <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
                className: 'drawer-style',
            }}>
            <div className="drawer-header">
                <NavBarLogo toggleDrawer={toggleDrawer} />
                <h4
                    style={{ color: 'black', cursor: 'pointer', margin: '0', paddingBottom: '5px' }}
                    onClick={() => {
                        toggleDrawer(false)();
                        navigate('/');
                    }}>
                    TRIPSYNC
                </h4>
                {firstName && (
                    <>
                        <p className="drawer-hello">{`Hello,`}</p>
                        <p className="drawer-hello">{`${firstName}`}</p>
                    </>
                )}
            </div>
            {pages.map((page) => (
                <button
                    key={page}
                    className="nav-button"
                    onClick={() => {
                        toggleDrawer(false)();
                        handleNavigate(page);
                    }}>
                    <p>{page}</p>
                </button>
            ))}
        </Drawer>
    );
}

export default HeaderDrawer;
