import './header.css';
import { useSelector } from 'react-redux';

function HeaderRight() {
    const firstName = useSelector((state) => state.userData.firstName);

    return (
        <div className="header-right">
            {firstName !== '' ? (
                <p className="text-ellipsis">{`Hello, ${firstName}`}</p>
            ) : null}
        </div>
    );
}

export default HeaderRight;
