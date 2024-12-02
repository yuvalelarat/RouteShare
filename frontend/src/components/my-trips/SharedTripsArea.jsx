import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from 'react-redux';
import { useGetSharedTripsQuery } from '../../redux/rtk/userDataApi.js';
import { setSharedTrips } from '../../redux/slices/userDataSlice.js';
import { useEffect } from 'react';

function SharedTripsArea() {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetSharedTripsQuery();

    useEffect(() => {
        if (data) {
            dispatch(setSharedTrips(data));
        }
    }, [data, dispatch]);


    if (isLoading) {
        return <div>Loading...</div>; //TODO: Add spinner
    }
    if (error) return <div>Error fetching trips: {error.message}</div>;
    return (
        <>
            {data && data.map((trip) => (
                <Card key={trip.trip_id} sx={cardStyle}>
                    <CardContent sx={cardContentStyle}>
                        <div className={'trip-details'}>
                            <h3 style={{ margin: '0px' }}>{trip.trip_name}</h3>
                            <h3 style={{ margin: '0px' }}>
                                <span style={{ fontWeight: 'normal' }}>
                                    {trip.start_date}
                                </span> &nbsp;-&nbsp;
                                <span style={{ fontWeight: 'normal' }}>
                                    {trip.end_date}
                                </span>
                            </h3>
                        </div>
                        <div className={'shared-trip-role-and-creator'}>
                            <h3 style={{ margin: '0px' }}>
                                Created by: <br /> {trip.user.first_name} {trip.user.last_name}
                            </h3>
                            <h3 style={{ margin: '0px' }}>
                                Role: <br /> {trip.participants[0]?.role}
                            </h3>
                        </div>
                        <div className={'buttonDiv'}>
                            <Button
                                variant="contained"
                                disableElevation
                                className={'view-edit-button'}
                            >
                                {trip.participants[0]?.role === 'edit' ? 'View & Edit' : 'View only'}
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
            ))}
        </>
    );
}

export default SharedTripsArea;
