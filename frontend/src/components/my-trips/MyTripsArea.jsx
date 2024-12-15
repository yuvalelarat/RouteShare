import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
    useGetMyTripsQuery,
    useLazyGetTripQuery,
    useDeleteTripMutation,
} from '../../redux/rtk/tripsDataApi.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTrips } from '../../redux/slices/tripsDataSlice.js';
import DeleteTrip from './DeleteTrip/DeleteTrip.jsx';
import EditSharingDialog from './EditParticipants/EditSharingDialog.jsx';

function MyTripsArea() {
    const { data, error, isLoading } = useGetMyTripsQuery();
    const [getTrip, { data: tripData, error: tripError }] = useLazyGetTripQuery();
    const [deleteTrip] = useDeleteTripMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.trips) {
            dispatch(setTrips(data.trips));
        }
    }, [data, dispatch]);

    const handleViewTripClick = async (tripId) => {
        const response = await getTrip(tripId);
        if (response?.data?.success) {
            window.location.href = `/trip/${tripId}`;
        } else {
            alert(response?.data?.error || 'Error fetching trip details.');
        }
    };

    const handleDelete = async (tripId) => {
        console.log('Attempting to delete trip with ID:', tripId);

        try {
            const response = await deleteTrip({ trip_id: tripId });
            console.log('Delete trip full response:', response);

            if (response?.data?.success) {
                console.log(response?.data?.success);
                window.location.href = `/my-trips`;
            } else {
                console.error('Error deleting trip:', response?.data?.error);
            }
        } catch (error) {
            console.error('Error in deleteTrip mutation:', error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>; // TODO: Add animation for loading?
    }

    if (error) {
        return <p>Error loading trips: {error.message}</p>;
    }

    return (
        <>
            {data?.trips?.length > 0 ? (
                data.trips.map((trip) => (
                    <Card key={trip.trip_id} sx={cardStyle}>
                        <CardContent sx={cardContentStyle}>
                            <div className={'trip-details'}>
                                <h3 className={'truncate-header-trip'}>{trip.trip_name}</h3>
                                <h3 className={'truncate-header-trip'}>
                                    <span style={{ fontWeight: 'normal', whiteSpace: 'nowrap' }}>
                                        {new Date(trip.start_date).toLocaleDateString('en-GB')}
                                    </span>
                                    &nbsp;- &nbsp;
                                    <span style={{ fontWeight: 'normal' }}>
                                        {new Date(trip.end_date).toLocaleDateString('en-GB')}
                                    </span>
                                </h3>
                            </div>
                            <div className={'buttonDiv'}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    className={'view-edit-button'}
                                    onClick={() => handleViewTripClick(trip.trip_id)}>
                                    View & Edit
                                </Button>
                                <EditSharingDialog tripId={trip.trip_id} />
                                <Button variant="contained" disableElevation className={'expenses-button'}>
                                    Expenses
                                </Button>
                                <DeleteTrip handleDelete={handleDelete} tripId={trip.trip_id} />
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p>No trips available</p>
            )}
        </>
    );
}

export default MyTripsArea;
