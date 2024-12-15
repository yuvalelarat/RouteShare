import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useLazyGetTripQuery } from '../redux/rtk/tripsDataApi';

// eslint-disable-next-line react/prop-types
const TripRoutes = ({ children }) => {
    const { trip_id } = useParams();
    const [getTrip, { data, isLoading, error }] = useLazyGetTripQuery();

    useEffect(() => {
        if (trip_id) {
            getTrip(trip_id);
        }
    }, [trip_id, getTrip]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (data?.success === false || error) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default TripRoutes;
