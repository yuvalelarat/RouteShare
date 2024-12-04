import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import './TripDayCard.css';
import Button from '@mui/material/Button';

// eslint-disable-next-line react/prop-types
function TripDayCard({ dayNumber, country, description, expenses }) {
    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h2 style={{ fontWeight: '400', margin: '0' }}>Day {dayNumber}</h2>
                    <h2 style={{ fontWeight: '400', margin: '0' }}>{country}</h2>
                    <div className={'description-div'}>
                        <p style={{ margin: '0' }}>{description}</p>
                    </div>
                </CardContent>
                <CardActions className={'card-action-style'}>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>{`Expenses: ${expenses}$`}</h3>
                    <Button variant={'contained'} disableElevation className={'more-info-button'}>
                        More info
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default TripDayCard;
