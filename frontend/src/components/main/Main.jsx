import './styles.css';
import logoMainPage from '../../assets/images/logo-main-page.png';

function Main() {
    return (
        <div className={'main-div'}>
            <div className={'img-box'}>
                <img src={logoMainPage} alt="Logo" />
            </div>
            <h1 className={'main-heading'}>Plan, Share and Explore</h1>
            <h1 className={'second-heading'}>all in one place</h1>
            <h3 className={'third-heading'}>
                Organize trips, track expenses, and stay connected every step of the way!
            </h3>
        </div>
    );
}

export default Main;
