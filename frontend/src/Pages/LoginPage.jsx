import PageTitle from '../components/common/PageTitle';
import LoginCard from '../components/login/LoginCard.jsx';
import UnderCard from '../components/login/UnderCard.jsx';

function LoginPage() {
    return (
        <>
            <PageTitle title={'Login'} />
            <LoginCard />
            <UnderCard />
        </>
    );
}

export default LoginPage;
