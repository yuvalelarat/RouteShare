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
import Button from '@mui/material/Button';
import { useState } from 'react';
import NewDayForm from '../NewDayForm/NewDayForm.jsx';

// eslint-disable-next-line react/prop-types
function BluredCard({ startDate, endDate }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h2 style={cardHeaderStyle}>31/12/2222 - Day 11</h2>
                    <h2 style={cardHeaderStyle}>Country</h2>
                    <div style={dayDescriptionBoxStyle}>
                        <p style={{ margin: '0' }}>
                            here will be description of the day and you can tell all you want about it, and
                            what will you do in this day, yes, it will be shown in the card, but it will be
                            blured, so you can't read it, but you can
                        </p>
                    </div>
                </CardContent>
                <CardActions style={cardActionsStyle}>
                    <h3 style={cardHeaderStyle}>Expenses: 10000$</h3>
                    <div style={moreInfoButtonStyle}>
                        <h3 style={moreInfoButtonTextStyle}>More info</h3>
                    </div>
                </CardActions>
            </Card>
            <div style={circleContainerStyle}>
                <div style={circleStyle}>
                    <Button
                        variant={'contained'}
                        disableElevation
                        style={headerStyle}
                        onClick={handleClickOpen}>
                        Add day
                    </Button>
                </div>
            </div>
            <NewDayForm open={open} onClose={handleClose} startDate={startDate} endDate={endDate} />
        </Box>
    );
}

export default BluredCard;
