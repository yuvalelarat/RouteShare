import './header.css';
import NavBarLogo from './NavBarLogo.jsx';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// eslint-disable-next-line react/prop-types
function HeaderLeft({ toggleDrawer }) {
    const navigate = useNavigate();

    return (
        <div className="header-left">
            <span className={'hamburger'} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: '26px' }} />
            </span>

            <NavBarLogo />
            <h3 style={{ color: 'black', cursor: 'pointer' }} onClick={() => navigate('/')}>
                TRIPSYNC
            </h3>
        </div>
    );
}

export default HeaderLeft;
