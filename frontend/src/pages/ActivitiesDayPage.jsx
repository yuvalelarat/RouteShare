import PageTitle from '../components/common/PageTitle.jsx';
import { useLazyGetActivitiesQuery } from '../redux/rtk/activityDataApi.js';
import { useEffect } from 'react';
import { calculateActivityDate } from '../utils/common.utils.js';
import DayActivitiesTop from '../components/day-activities/DayActivitiesTop.jsx';
import { useParams } from 'react-router-dom';
import ActivityCard from '../components/day-activities/ActivityCard.jsx';
import BluredCard from '../components/day-activities/BluredCard/BluredCard.jsx';

function ActivitiesDayPage() {
    const { journey_id } = useParams();
    const [getActivities, { data: ActivitiesData, error: ActivitiesError, isLoading }] =
        useLazyGetActivitiesQuery();
    const dayNumber = ActivitiesData?.response.day_number;
    const date = calculateActivityDate(ActivitiesData?.response.start_date, dayNumber);
    const country = ActivitiesData?.response.country;

    useEffect(() => {
        if (journey_id) {
            getActivities(journey_id);
        }
    }, [journey_id, getActivities]);

    if (isLoading) {
        return <div>Loading journeys...</div>;
    }

    if (ActivitiesError) {
        return <div>Error loading journeys: {ActivitiesError}</div>;
    }

    return (
        <>
            <PageTitle title={`${date} - day ${dayNumber}`} />
            <DayActivitiesTop country={country} />
            <div className={'cardDiv'}>
                {ActivitiesData?.response.activities?.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} />
                ))}
                <BluredCard />
            </div>
        </>
    );
}

export default ActivitiesDayPage;
