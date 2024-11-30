// src/components/HeaderDrawer.jsx
import Drawer from '@mui/material/Drawer';
import NavBarLogo from './NavBarLogo';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { pages } from './constants.js';
import { stringToUrlFormat } from '../../utils/common.utils.js';

// eslint-disable-next-line react/prop-types
function HeaderDrawer({ open, toggleDrawer }) {
    const navigate = useNavigate();

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
                        navigate(`/${stringToUrlFormat(page)}`);
                    }}
                >
                    {page}
                </Button>
            ))}
        </Drawer>
    );
}

export default HeaderDrawer;
