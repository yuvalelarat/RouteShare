import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { useGetMyTripsQuery, useLazyGetTripQuery } from '../../redux/rtk/tripsDataApi.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTrips } from '../../redux/slices/tripsDataSlice.js';

function MyTripsArea() {
    const { data, error, isLoading } = useGetMyTripsQuery();
    const [getTrip, { data: tripData, error: tripError }] = useLazyGetTripQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.trips) {
            dispatch(setTrips(data.trips));
        }
    }, [data, dispatch]);

    const handleTripClick = async (tripId) => {
        const response = await getTrip(tripId);
        if (response?.data?.success) {
            navigate(`/trip/${tripId}`);
        } else {
            alert(response?.data?.error || 'Error fetching trip details.');
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
                                    onClick={() => handleTripClick(trip.trip_id)}
                                >
                                    View & Edit
                                </Button>
                                <Button variant="contained" disableElevation className={'share-button'}>
                                    Share
                                </Button>
                                <Button variant="contained" disableElevation className={'expenses-button'}>
                                    Expenses
                                </Button>
                                <Button variant="contained" disableElevation className={'delete-button'}>
                                    Delete
                                </Button>
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
