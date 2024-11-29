import './header.css';
import NavBarLogo from './NavBarLogo.jsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// import { stringToUrlFormat } from '../../utils/common.utils.js';

function Header() {
    const navigate = useNavigate();

    /*
    const handleNavigate = (page) => {
        navigate(`/${stringToUrlFormat(page)}`);
    };*/

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
            <div style={{ display: 'flex', width: '33%' }}>
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
            <div style={{ display: 'flex', width: '33%', justifyContent: 'flex-end' }}>
                <p>{`Hello, |user: Full_Name|`}</p>
            </div>
        </div>
    );
}

export default Header;
