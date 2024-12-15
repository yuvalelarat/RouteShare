import logo from '../../assets/images/logo4.png';
import './NavBarLogo.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function NavBarLogo({ toggleDrawer }) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/');
        if (toggleDrawer) {
            toggleDrawer(false)();
        }
    };

    return <img src={logo} alt="Logo" className="logo-img" onClick={handleNavigation} />;
}

export default NavBarLogo;
