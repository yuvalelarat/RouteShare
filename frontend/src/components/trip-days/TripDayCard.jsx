import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import './TripDayCard.css';
import Button from '@mui/material/Button';
import { useDeleteJourneyMutation } from '../../redux/rtk/journeyDataApi.js';
import { useLazyGetActivitiesQuery } from '../../redux/rtk/activityDataApi.js';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteDay from './DeleteDay/DeleteDay.jsx';

// eslint-disable-next-line react/prop-types
function TripDayCard({ dayNumber, country, description, expenses, date, journeyId, userRole }) {
    const navigate = useNavigate();
    const { trip_id } = useParams();
    const [deleteJourney] = useDeleteJourneyMutation();
    const [getActivities, { data: ActivitiesData, error: ActivitiesError }] = useLazyGetActivitiesQuery();

    const handleDelete = async () => {
        try {
            await deleteJourney({ journey_id: journeyId, trip_id });
        } catch (error) {
            console.error('Error deleting journey:', error.message || error);
        }
    };

    const handleViewDayClick = async () => {
        const response = await getActivities(journeyId);
        if (response?.data?.success) {
            navigate(`/trip/${trip_id}/${journeyId}`);
        } else {
            alert(response?.data?.error || 'Error fetching trip details.');
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
                        <Button
                            variant={'contained'}
                            disableElevation
                            className={'more-info-button'}
                            onClick={handleViewDayClick}>
                            View
                        </Button>
                        {userRole !== 'view' && (
                            <>
                                <Button variant={'contained'} disableElevation className={'edit-day-button'}>
                                    Edit
                                </Button>
                                <DeleteDay handleDelete={handleDelete} />
                            </>
                        )}
                    </div>
                </CardActions>
            </Card>
        </Box>
    );
}

export default TripDayCard;
