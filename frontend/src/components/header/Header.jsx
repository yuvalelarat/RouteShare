import './header.css';
import NavBarLogo from './NavBarLogo.jsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { stringToUrlFormat } from '../../utils/common.utils.js';
import { pages } from './constants.js';

function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState();

    const handleNavigate = (page) => {
        navigate(`/${stringToUrlFormat(page)}`);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="header-container">
            <div className="header-left">
                <span className={'hamburger'} onClick={toggleDrawer(true)}>
                    <MenuIcon sx={{ fontSize: '26px' }} />
                </span>

                <NavBarLogo />
                <h4 style={{ color: 'black', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    TRIPSYNC
                </h4>
            </div>
            <nav className="navbar">
                {pages.map((page) => (
                    <Button
                        key={page}
                        variant="text"
                        className="button-style"
                        onClick={() => handleNavigate(page)}
                    >
                        {page}
                    </Button>
                ))}
            </nav>
            <div className="header-greeting">
                <p className="text-ellipsis">{`Hello, |user_full_name|`}</p>
            </div>

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: '#d6fbff',
                        width: '40%',
                        display: 'flex',
                        padding: '0 12px',
                        flexDirection: 'column',
                        gap: '10px'
                    }
                }}>
                <div className="drawer-header">
                    <NavBarLogo />
                    <h4 style={{ color: 'black', cursor: 'pointer', margin: '0' }} onClick={() => navigate('/')}>
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
                            handleNavigate(page);
                            toggleDrawer(false)();
                        }}
                    >
                        {page}
                    </Button>
                ))}
            </Drawer>
        </div>
    );
}

export default Header;
