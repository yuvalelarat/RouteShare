import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import './TripDayCard.css';
import Button from '@mui/material/Button';
import { useDeleteJourneyMutation } from '../../redux/rtk/journeyDataApi.js';
import DeleteDay from './DeleteDay/DeleteDay.jsx';
import EditDayForm from './EditDayForm/EditDayForm.jsx';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripContext from '../../context/TripContext.js';

// eslint-disable-next-line react/prop-types
function TripDayCard({ dayNumber, country, description, expenses, date, journeyId, startDate, endDate }) {
    const { trip_id, userRole } = useContext(TripContext);
    const [deleteJourney] = useDeleteJourneyMutation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteJourney({ journey_id: journeyId, trip_id });
        } catch (error) {
            console.error('Error deleting journey:', error.message || error);
        }
    };

    const handleViewDayClick = () => {
        navigate(`/trip/${trip_id}/${journeyId}`);
    };

    const handleEditDayClick = () => {
        setOpen(true);
    };

    const handleCloseEditDay = () => {
        setOpen(false);
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
                                <Button
                                    variant={'contained'}
                                    disableElevation
                                    className={'edit-day-button'}
                                    onClick={handleEditDayClick}>
                                    Edit
                                </Button>
                                <DeleteDay handleDelete={handleDelete} />
                            </>
                        )}
                    </div>
                </CardActions>
            </Card>
            <EditDayForm
                open={open}
                onClose={handleCloseEditDay}
                dayNumber={dayNumber}
                date={date}
                country={country}
                description={description}
                startDate={startDate}
                endDate={endDate}
                journeyId={journeyId}
            />
        </Box>
    );
}

export default TripDayCard;
