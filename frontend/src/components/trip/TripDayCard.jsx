import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import './TripDayCard.css';

// eslint-disable-next-line react/prop-types
function TripDayCard({ dayNumber, country, description }) {
    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h2 style={{ fontWeight: '400', margin: '0' }}>
                        Day {dayNumber}
                    </h2>
                    <h2 style={{ fontWeight: '400', margin: '0' }}>{country}</h2>
                    <div className={'description-div'}>
                        <p style={{ margin: '0' }}>{description}</p>
                    </div>
                </CardContent>
                <CardActions
                    className={'card-action-style'}>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>Expenses: 100$</h3>
                    <button className={'more-info-button'}>
                        More info
                    </button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default TripDayCard;
