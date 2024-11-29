import './header.css';
import NavBarLogo from './NavBarLogo.jsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

// import { stringToUrlFormat } from '../../utils/common.utils.js';

function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState();
    /*
    const handleNavigate = (page) => {
        navigate(`/${stringToUrlFormat(page)}`);
    };*/

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div
            style={{
                display: 'flex',
                padding: '0 24px',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--color-lightblue)',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            }}>
            <div style={{ display: 'flex', width: '25%', alignItems: 'center', gap: '12px' }}>
                <span className={'hamburger'} onClick={toggleDrawer(true)}>
                    <MenuIcon sx={{ fontSize: '26px' }} />
                </span>

                <NavBarLogo />
                <h4 style={{ color: 'black', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    TRIPSYNC
                </h4>
            </div>
            <nav className={'navbar'}>
                <Button variant={'text'} sx={{ color: 'black' }}>
                    Login
                </Button>
                <Button variant={'text'} sx={{ color: 'black' }}>
                    Register
                </Button>
                <Button variant={'text'} sx={{ color: 'black' }}>
                    New trip
                </Button>
                <Button variant={'text'} sx={{ color: 'black' }}>
                    My trip
                </Button>
            </nav>
            <div style={{ width: '25%', textAlign: 'end' }}>
                <p
                    style={{
                        textWrap: 'nowrap',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{`Hello, |user_full_name|`}</p>
            </div>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Button variant={'text'} sx={{ color: 'black', outline: '1px solid red' }}>
                    Login
                </Button>
                <Button variant={'text'} sx={{ color: 'black', outline: '1px solid red' }}>
                    Register
                </Button>
                <Button variant={'text'} sx={{ color: 'black', outline: '1px solid red' }}>
                    New trip
                </Button>
                <Button variant={'text'} sx={{ color: 'black', outline: '1px solid red' }}>
                    My trip
                </Button>
            </Drawer>
        </div>
    );
}

export default Header;
