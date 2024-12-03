import PageTitle from '../components/common/PageTitle';
import LoginCard from '../components/trip/TripCard.jsx';
import TripDetailsHeaders from '../components/trip/TripDetailsHeaders.jsx';
import AddLoginCard from '../components/trip/AddLoginCard.jsx';

function TripPage() {
    const titleDivStyle = {
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    };

    const cardDivStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '5vw'

    };

    return (
        <>
            <div style={titleDivStyle}>
                <PageTitle title={'TRIP NAME'} />
            </div>
            <TripDetailsHeaders />
            <div style={cardDivStyle}>
                <LoginCard />
                <LoginCard />
                <AddLoginCard />
            </div>
        </>
    );
}

export default TripPage;
