import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useGetSharedTripsQuery, useLazyGetTripQuery } from '../../redux/rtk/tripsDataApi.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSharedTrips } from '../../redux/slices/tripsDataSlice.js';
import { useNavigate } from 'react-router-dom';

function SharedTripsArea() {
    const { data, error, isLoading } = useGetSharedTripsQuery();
    const [triggerGetSharedTrips, { data: sharedTripData, error: sharedTripError }] = useLazyGetTripQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.trips) {
            dispatch(setSharedTrips(data.trips));
        }
    }, [data, dispatch]);

    const handleTripClick = (tripId) => {
        triggerGetSharedTrips(tripId).unwrap()
            .then((response) => {
                if (response.success) {
                    navigate(`/trip/${tripId}`);
                } else {
                    alert('Error: Unable to load shared trip details');
                }
            })
            .catch((err) => alert('Error: ' + err.message));
    };

    if (isLoading) {
        return <p>Loading...</p>; //TODO: Add animation for loading?
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
                            <div className={'shared-trip-details'}>
                                <h3 className={'shared-trip-trip-name'}>{trip.trip_name}</h3>
                                <h3 style={{ margin: '0px' }}>
                                    <span style={{ fontWeight: 'normal' }}>
                                        {new Date(trip.start_date).toLocaleDateString('en-GB')}
                                    </span>{' '}
                                    &nbsp;-&nbsp;
                                    <span style={{ fontWeight: 'normal' }}>
                                        {new Date(trip.end_date).toLocaleDateString('en-GB')}
                                    </span>
                                </h3>
                            </div>
                            <div className={'shared-trip-role-and-creator'}>
                                <h3 style={{ margin: '0px' }}>
                                    Created by: <br /> {trip.user.first_name} {trip.user.last_name}
                                </h3>
                                <h3 style={{ margin: '0px' }}>
                                    Role: <br /> {trip.participants[0].role}
                                </h3>
                            </div>
                            <div className={'buttonDiv'}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    className={'view-edit-button'}
                                    onClick={() => handleTripClick(trip.trip_id)}
                                >
                                    {trip.participants[0].role === 'edit' ? 'View & Edit' : 'View only'}
                                </Button>
                                <Button variant="contained" disableElevation className={'expenses-button'}>
                                    Expenses
                                </Button>
                                <Button variant="contained" disableElevation className={'delete-button'}>
                                    Remove
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p>No shared trips available</p>
            )}
        </>
    );
}

export default SharedTripsArea;
