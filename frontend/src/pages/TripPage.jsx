import PageTitle from '../components/common/PageTitle';
import TripDayCard from '../components/trip/TripDayCard.jsx';
import TripDetailsHeaders from '../components/trip/TripDetailsHeaders.jsx';
import BluredCard from '../components/trip/BluredCard/BluredCard.jsx';
import { useGetAllJourneysQuery } from '../redux/rtk/tripsDataApi.js';
import { useParams } from 'react-router-dom';

function TripPage() {
    const { trip_id } = useParams();
    if (!trip_id) {
        return <div>Error: Trip ID is not available.</div>;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, isLoading } = useGetAllJourneysQuery(trip_id);

    const tripName = data?.trip_name;
    const journeys = data?.journeys;
    const tripAdmin = data?.trip_admin.admin_name;
    const startDate = data?.start_date;
    const endDate = data?.end_date;

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

    if (isLoading) {
        return <div>Loading journeys...</div>;
    }

    if (error) {
        return <div>Error loading journeys: {error.message}</div>;
    }
    return (
        <>
            <div style={titleDivStyle}>
                <PageTitle title={tripName} />
            </div>
            <TripDetailsHeaders
                tripAdmin={tripAdmin}
                startDate={new Date(startDate).toLocaleDateString('en-GB')}
                endDate={new Date(endDate).toLocaleDateString('en-GB')}
            />
            <div style={cardDivStyle}>
                {journeys?.map((journey) => (
                        <TripDayCard
                            key={journey.journey_id}
                            dayNumber={journey.day_number}
                            country={journey.country}
                            description={journey.description}
                        />
                ))}
                <BluredCard />
            </div>
        </>
    );
}

export default TripPage;
