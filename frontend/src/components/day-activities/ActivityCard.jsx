import { Box } from '@mui/material';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './ActivityCard.css';
import DeleteActivity from './DeleteActivity/DeleteActivity.jsx';
import { useDeleteActivityMutation } from '../../redux/rtk/activityDataApi.js';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ActivityCard({ activity }) {
    const activity_id = activity.activity_id;
    const { journey_id } = useParams();
    const [deleteActivity] = useDeleteActivityMutation();

    const handleDelete = async () => {
        try {
            await deleteActivity({ activity_id, journey_id }).unwrap();
            console.log('Activity deleted successfully');
        } catch (error) {
            console.error('Failed to delete the activity:', error);
        }
    };

    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h3 className={'activity-name'}>{activity.activity_name}</h3>
                    <h3 className={'activity-location'}>{activity.location}</h3>
                    <div className={'activity-description-div'}>
                        <p style={{ margin: '0' }}>{activity.description}</p>
                    </div>
                    <h3 className={'activity-headers'}>{`Atcivity type: ${activity.activity_type}`}</h3>
                    <h3 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>
                        Cost: {activity.cost}$
                    </h3>
                    <h3 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>
                        {activity.paid_by === null
                            ? `${activity.payment_method}`
                            : `Who pays: ${activity.paid_by.first_name} ${activity.paid_by.last_name}`}
                    </h3>
                </CardContent>
                <CardActions className={'activity-action-style'}>
                    {/*TODO: edit button!!!!  <Button className={'edit-day-button'}>Edit</Button>*/}
                    <DeleteActivity handleDelete={handleDelete} />
                </CardActions>
            </Card>
        </Box>
    );
}

export default ActivityCard;
