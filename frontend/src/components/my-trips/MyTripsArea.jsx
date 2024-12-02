import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from 'react-redux';

function MyTripsArea() {
    const trips = useSelector((state) => state.userData.trips);
    //TODO: if no trips, return a message with link to new trip page
    return (
        <>
            {trips.map((trip) => (
                <Card key={trip.trip_id} sx={cardStyle}>
                    <CardContent sx={cardContentStyle}>
                        <div className={'trip-details'}>
                            <h3 className={'truncate-header-trip'}>{trip.trip_name}</h3>
                            <h3 className={'truncate-header-trip'}>
                                <span
                                    style={{
                                        fontWeight: 'normal',
                                        whiteSpace: 'nowrap'
                                    }}>
                                    {new Date(trip.start_date).toLocaleDateString('en-GB')}
                                </span>
                                &nbsp;- &nbsp;
                                <span style={{ fontWeight: 'normal' }}>
                                    {new Date(trip.end_date).toLocaleDateString('en-GB')}
                                </span>
                            </h3>
                        </div>
                        <div className={'buttonDiv'}>
                            <Button variant="contained" disableElevation className={'view-edit-button'}>
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
            ))}
        </>
    );
}

export default MyTripsArea;
