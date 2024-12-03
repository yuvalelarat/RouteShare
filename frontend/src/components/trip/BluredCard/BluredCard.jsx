import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import '../TripDayCard.css';
import CardContent from '@mui/material/CardContent';
import { cardContentStyle } from '../styles.js';
import CardActions from '@mui/material/CardActions';
import {
    cardStyle,
    circleStyle,
    headerStyle,
    boxStyle,
    dayDescriptionBoxStyle,
    moreInfoButtonStyle,
    moreInfoButtonTextStyle,
    cardActionsStyle,
    circleContainerStyle,
    cardHeaderStyle,
} from './styles.js';

function BluredCard() {
    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h2 style={cardHeaderStyle}>28/08/2024 - Day 1</h2>
                    <h2 style={cardHeaderStyle}>Iceland</h2>
                    <div style={dayDescriptionBoxStyle}>
                        <p style={{ margin: '0' }}>here will be description of the day</p>
                    </div>
                </CardContent>
                <CardActions style={cardActionsStyle}>
                    <h3 style={cardHeaderStyle}>Expenses: 100$</h3>
                    <div style={moreInfoButtonStyle}>
                        <h3 style={moreInfoButtonTextStyle}>More info</h3>
                    </div>
                </CardActions>
            </Card>
            <div style={circleContainerStyle}>
                <div style={circleStyle}>
                    <h3 style={headerStyle}>Add day</h3>
                </div>
            </div>
        </Box>
    );
}

export default BluredCard;
