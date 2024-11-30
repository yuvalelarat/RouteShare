import { useNavigate } from 'react-router-dom';
import './UnderCard.css';


// eslint-disable-next-line react/prop-types
function UnderCard({ text, linkText, link }) {
    const navigate = useNavigate();

    const handleNavigate = (link) => {
        navigate(`/${link}`);//TODO: Add link to reset password page
    };

    return (
        <p className={'forgot-password'}>
            {text} &nbsp;
            <a className={'reset-password'} onClick={() => handleNavigate(link)}>{linkText}</a>
        </p>
    );
}

export default UnderCard;
