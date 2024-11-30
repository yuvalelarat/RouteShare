import { useNavigate } from 'react-router-dom';
import './Login.css';


function UnderCard() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');//TODO: Add link to reset password page
    };

    return (
        <p className={'forgot-password'}>
            Forgot password? &nbsp;
            <a className={'reset-password'} onClick={() => handleNavigate()}>Reset
                password</a>
        </p>
    );
}

export default UnderCard;
