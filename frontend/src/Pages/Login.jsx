import PageTitle from '../components/common/PageTitle';
import LoginCard from '../components/login/LoginCard.jsx';
import UnderCard from '../components/login/UnderCard.jsx';

function Login() {
    return (
        <>
            <PageTitle title={'Login'} />
            <LoginCard />
            <UnderCard />
        </>
    );
}

export default Login;
