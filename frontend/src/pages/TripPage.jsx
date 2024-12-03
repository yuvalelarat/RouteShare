import PageTitle from '../components/common/PageTitle';
import TripDayCard from '../components/trip/TripDayCard.jsx';
import TripDetailsHeaders from '../components/trip/TripDetailsHeaders.jsx';
import BluredCard from '../components/trip/BluredCard/BluredCard.jsx';
import { useGetAllJourneysQuery } from '../redux/rtk/tripsDataApi.js';
import { useParams } from 'react-router-dom';
import './TripPage.css';
import {calculateNumberOfDays} from '../utils/common.utils.js';

function TripPage() {
    const { trip_id } = useParams();

    const { data, error, isLoading } = useGetAllJourneysQuery(trip_id);

    const tripName = data?.trip_name;
    const journeys = data?.journeys;
    const sortedJourneys = journeys
        ? [...journeys].sort((a, b) => a.day_number - b.day_number)
        : [];
    const tripAdmin = data?.trip_admin.admin_name;
    const startDate = data?.start_date;
    const endDate = data?.end_date;
    const numberOfJourneys = journeys ? journeys.length : 0;
    const numberOfDays = calculateNumberOfDays(startDate, endDate);

    if (isLoading) {
        return <div>Loading journeys...</div>;
    }

    if (error) {
        return <div>Error loading journeys: {error.message}</div>;
    }
    return (
        <>
            <div className={'titleDiv '}>
                <PageTitle title={tripName} />
            </div>
            <TripDetailsHeaders
                tripAdmin={tripAdmin}
                startDate={new Date(startDate).toLocaleDateString('en-GB')}
                endDate={new Date(endDate).toLocaleDateString('en-GB')}
            />
            <div className={'cardDiv'}>
                {sortedJourneys.map((journey) => (
                    <TripDayCard
                        key={journey.journey_id}
                        dayNumber={journey.day_number}
                        country={journey.country}
                        description={journey.description}
                    />
                ))}
                {numberOfJourneys === numberOfDays ? null : <BluredCard />}
            </div>
        </>
    );
}

export default TripPage;
