import './header.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { stringToUrlFormat } from '../../utils/common.utils.js';
import { pages } from './constants.js';
import HeaderLeft from './HeaderLeft';
import HeaderDrawer from './HeaderDrawer';

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
            <HeaderLeft toggleDrawer={toggleDrawer} />
            <nav className="navbar">
                {pages.map((page) => (
                    <Button
                        key={page}
                        variant="text"
                        className="button-style"
                        onClick={() => handleNavigate(page)}>
                        {page}
                    </Button>
                ))}
            </nav>
            <div className="header-right">
                <p className="text-ellipsis">{`Hello, |user_full_name|`}</p>
            </div>

            <HeaderDrawer open={open} toggleDrawer={toggleDrawer} />
        </div>
    );
}

export default Header;