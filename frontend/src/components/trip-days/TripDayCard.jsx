import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import './TripDayCard.css';
import Button from '@mui/material/Button';
import { useDeleteJourneyMutation } from '../../redux/rtk/tripsDataApi.js';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function TripDayCard({ dayNumber, country, description, expenses, date, journeyId, userRole }) {
    const { trip_id } = useParams();
    const [deleteJourney] = useDeleteJourneyMutation();

    const handleDelete = async () => {
        try {
            await deleteJourney({ journey_id: journeyId, trip_id });
        } catch (error) {
            console.error('Error deleting journey:', error.message || error);
        }
    };

    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h3 style={{ fontWeight: '600', margin: '0' }}>{`${date} - Day ${dayNumber}`}</h3>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>{country}</h3>
                    <div className={'description-div'}>
                        <p style={{ margin: '0' }}>{description}</p>
                    </div>
                </CardContent>
                <CardActions className={'card-action-style'}>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>{`Expenses: ${expenses}$`}</h3>
                    <div className={'buttons-container'}>
                        <Button variant={'contained'} disableElevation className={'more-info-button'}>
                            View
                        </Button>
                        {userRole !== 'view' && (
                            <>
                                <Button variant={'contained'} disableElevation className={'edit-day-button'}>
                                    Edit
                                </Button>
                                <Button
                                    variant={'contained'}
                                    disableElevation
                                    className={'delete-day-button'}
                                    onClick={handleDelete}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </CardActions>
            </Card>
        </Box>
    );
}

export default TripDayCard;
