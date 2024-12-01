// src/components/HeaderDrawer.jsx
import Drawer from '@mui/material/Drawer';
import NavBarLogo from './NavBarLogo';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pages } from './constants.js';
import { stringToUrlFormat } from '../../utils/common.utils.js';
import { logout } from '../../redux/slices/userDataSlice.js';

// eslint-disable-next-line react/prop-types
function HeaderDrawer({ open, toggleDrawer }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (page) => {
        if (page === 'Logout') {
            dispatch(logout());
            console.log('Logged out');
            navigate('/login');
        } else {
            navigate(`/${stringToUrlFormat(page)}`);
        }
    };

    return (
        <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
                className: 'drawer-style'
            }}
        >
            <div className="drawer-header">
                <NavBarLogo toggleDrawer={toggleDrawer} />
                <h4
                    style={{ color: 'black', cursor: 'pointer', margin: '0' }}
                    onClick={() => {
                        toggleDrawer(false)();
                        navigate('/');
                    }}
                >
                    TRIPSYNC
                </h4>
                <p className="drawer-hello">{`Hello,`}</p>
                <p className="drawer-hello">{`|user_full_name|`}</p>
            </div>
            {pages.map((page) => (
                <Button
                    key={page}
                    variant="text"
                    className="button-style"
                    onClick={() => {
                        toggleDrawer(false)();
                        handleNavigate(page);
                    }}
                >
                    {page}
                </Button>
            ))}
        </Drawer>
    );
}

export default HeaderDrawer;
