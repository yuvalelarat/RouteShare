import PageTitle from '../components/common/PageTitle';
import TripCard from '../components/my-trips/TripCard.jsx';

function MyTripsPage() {
    return (
        <>
            <PageTitle title={'My Trips'} />
            <TripCard></TripCard>
        </>
    );
}

export default MyTripsPage;
