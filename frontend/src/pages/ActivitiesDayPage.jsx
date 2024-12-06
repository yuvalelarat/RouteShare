import PageTitle from '../components/common/PageTitle.jsx';
import { useLazyGetActivitiesQuery } from '../redux/rtk/activityDataApi.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { calculateActivityDate } from '../utils/common.utils.js';

function ActivitiesDayPage() {
    const { journey_id } = useParams();
    const [getActivities, { data: ActivitiesData, error: ActivitiesError }] = useLazyGetActivitiesQuery();

    useEffect(() => {
        if (journey_id) {
            getActivities(journey_id);
        }
    }, [journey_id, getActivities]);

    console.log(ActivitiesData?.response);

    return (
        <div>
            <PageTitle
                title={`Date: ${calculateActivityDate(ActivitiesData?.response.date, ActivitiesData?.response.day_number)}, Day: ${ActivitiesData?.response.day_number}, Country: ${ActivitiesData?.response.country}`}
            />
            {ActivitiesError && <div>Error loading activities</div>}
            {ActivitiesData && <div></div>}
        </div>
    );
}

export default ActivitiesDayPage;
