import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import { myTrip } from './mockData.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function MyTripsArea() {
    return (
        <>
            {myTrip.map((trip) => (
                <Card key={trip.tripId} sx={cardStyle}>
                    <CardContent sx={cardContentStyle}>
                        <div className={'trip-details'}>
                            <h3 className={'truncate-header-trip'}>{trip.tripName}</h3>
                            <h3 className={'truncate-header-trip'}>
                                <span style={{ fontWeight: 'normal' }}>{trip.startDate}</span>&nbsp;-
                                &nbsp;
                                <span style={{ fontWeight: 'normal' }}>{trip.endDate}</span>
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
