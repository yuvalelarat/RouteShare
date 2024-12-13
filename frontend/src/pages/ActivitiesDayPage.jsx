import PageTitle from '../components/common/PageTitle.jsx';
import { useGetActivitiesQuery } from '../redux/rtk/activityDataApi.js';
import { useEffect, useState } from 'react';
import { calculateActivityDate } from '../utils/common.utils.js';
import DayActivitiesTop from '../components/day-activities/DayActivitiesTop.jsx';
import { useParams } from 'react-router-dom';
import ActivityCard from '../components/day-activities/ActivityCard.jsx';
import BluredCard from '../components/day-activities/BluredCard/BluredCard.jsx';
import useJourneySocket from '../hooks/useJourneySocket.js';

function ActivitiesDayPage() {
    const { journey_id } = useParams();
    const { data, error, isLoading } = useGetActivitiesQuery(journey_id);
    const [activities, setActivities] = useState([]);
    const dayNumber = data?.response.day_number;
    const date = calculateActivityDate(data?.response.start_date, dayNumber);
    const country = data?.response.country;
    const role = data?.response.role;

    useEffect(() => {
        if (data) {
            setActivities(data?.response.activities);
        }
    }, [data]);

    useJourneySocket(journey_id, setActivities);

    if (isLoading) {
        return <div>Loading journeys...</div>;
    }

    if (error) {
        return <div>Error loading journeys: {error}</div>;
    }

    return (
        <>
            <PageTitle title={`${date} - day ${dayNumber}`} />
            <DayActivitiesTop country={country} />
            <div className={'cardDiv'}>
                {activities.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} role={role} />
                ))}
                {role !== 'view' ? <BluredCard journey_id={journey_id} /> : null}
            </div>
        </>
    );
}

export default ActivitiesDayPage;
