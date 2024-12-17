import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useGetSharedTripsQuery, useLazyGetTripQuery } from '../../redux/rtk/tripsDataApi.js';
import { useRemoveParticipantMutation } from '../../redux/rtk/participantsDataApi.js';
import { useEffect } from 'react';
import RemoveSharedTrip from './RemoveSharedTrip/RemoveSharedTrip.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SharedTripsArea() {
    const { data, error, isLoading, refetch } = useGetSharedTripsQuery();
    const [triggerGetSharedTrips, { data: sharedTripData, error: sharedTripError }] = useLazyGetTripQuery();
    const [removeParticipant] = useRemoveParticipantMutation();
    const email = useSelector((state) => state.userData.email);
    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, [data]);

    const handleClick = (tripId, tripName, expenses = false) => {
        if (expenses) {
            navigate(`/trip/${tripId}/expenses`, { state: { tripName } });
            return;
        }
        triggerGetSharedTrips(tripId)
            .unwrap()
            .then((response) => {
                if (response.success) {
                    navigate(`/trip/${tripId}`);
                }
            })
            .catch((err) => console.log('Error: ' + err.message));
    };

    const handleDelete = (tripId, email) => {
        try {
            removeParticipant({ trip_id: tripId, email: email });
            refetch();
        } catch (err) {
            console.error('error removing you from shared trip' + err);
        }
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
                                    onClick={() => handleClick(trip.trip_id)}>
                                    {trip.participants[0].role === 'edit' ? 'View & Edit' : 'View'}
                                </Button>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    className={'share-button'}
                                    onClick={() => handleClick(trip.trip_id, trip.trip_name, true)}>
                                    Expenses
                                </Button>
                                <RemoveSharedTrip
                                    handleDelete={handleDelete}
                                    tripId={trip.trip_id}
                                    email={email}
                                />
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
