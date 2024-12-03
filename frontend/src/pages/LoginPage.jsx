import PageTitle from '../components/common/PageTitle';
import LoginCard from '../components/login/LoginCard.jsx';
import UnderCard from '../components/common/UnderCard.jsx';

function LoginPage() {
    return (
        <>
            <PageTitle title={'Login'} />
            <LoginCard />
            <UnderCard text={'Forgot password?'} linkText={'Reset password'} link={'reset-password'} />
        </>
    );
}

export default LoginPage;
