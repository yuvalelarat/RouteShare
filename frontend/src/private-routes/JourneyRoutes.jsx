import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useLazyGetActivitiesQuery } from '../redux/rtk/activityDataApi.js';

// eslint-disable-next-line react/prop-types
const JourneyRoutes = ({ children }) => {
    const { journey_id } = useParams();
    const [getActivities, { data: ActivitiesData, error: ActivitiesError, isLoading }] =
        useLazyGetActivitiesQuery();

    useEffect(() => {
        if (journey_id) {
            getActivities(journey_id);
        }
    }, [journey_id, getActivities]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (ActivitiesError?.data?.success === false) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default JourneyRoutes;
