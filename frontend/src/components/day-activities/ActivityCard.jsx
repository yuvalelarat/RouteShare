import { Box } from '@mui/material';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './ActivityCard.css';

// eslint-disable-next-line react/prop-types
function ActivityCard({ activity }) {
    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h3 style={{ fontWeight: '600', margin: '0' }}>{activity.activity_name}</h3>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>{activity.location}</h3>
                    <div className={'activity-description-div'}>
                        <p style={{ margin: '0' }}>{activity.description}</p>
                    </div>
                    <h3 className={'activity-headers'}>{`Atcivity type: ${activity.activity_type}`}</h3>
                    <h3 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>
                        Cost: {activity.cost}$
                    </h3>
                    <h3
                        className={
                            'activity-headers'
                        }>{`Who pays: ${activity.paid_by.first_name} ${activity.paid_by.last_name}`}</h3>
                </CardContent>
                <CardActions className={'activity-action-style'}>
                    <Button className={'edit-day-button'}>Edit</Button>
                    <Button className={'delete-day-button'}>Delete</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default ActivityCard;
