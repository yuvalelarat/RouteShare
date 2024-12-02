import './styles.css';
import logoMainPage from '../../assets/images/logo-main-page.png';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    return (
        <div className={'main-div'}>
            <div className={'img-box'}>
                <img src={logoMainPage} alt="Logo" />
            </div>
            <h1 className={'main-heading'}>Plan, share and explore</h1>
            <h1 className={'second-heading'}>all in one place</h1>
            <h3 className={'third-heading'}>
                Organize trips, track expenses, and stay connected every step of the way!
            </h3>
            <div className={'button-div'} onClick={() => {
                navigate('/register');
            }}>
                <h3 style={{ margin: '5px', fontWeight: '600' }}>Register</h3>
            </div>
        </div>
    );
}

export default Main;
