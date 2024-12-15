import PageTitle from '../components/common/PageTitle';
import UnderCard from '../components/common/UnderCard.jsx';
import RegisterCard from '../components/register/RegisterCard.jsx';

function RegisterPage() {
    return (
        <>
            <PageTitle title={'Register'} />
            <RegisterCard />
            <UnderCard text={'Already have an account?'} linkText={'Click here to login!'} link={'login'} />
        </>
    );
}

export default RegisterPage;
