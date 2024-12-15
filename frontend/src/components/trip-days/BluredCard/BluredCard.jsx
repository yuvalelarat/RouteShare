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
                    <h3 style={cardHeaderStyle}>31/12/2222 - Day 11</h3>
                    <h3 style={cardHeaderStyle}>Country</h3>
                    <div style={dayDescriptionBoxStyle}>
                        <p style={{ margin: '0' }}>
                            here will be description of the day and you can tell all you want about it, and
                            what will you do in this day, yes, it will be shown in the card
                        </p>
                    </div>
                </CardContent>
                <CardActions style={cardActionsStyle}>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>Expenses: 10000$</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw' }}>
                        <Button
                            variant={'contained'}
                            disableElevation
                            disabled={true}
                            className={'edit-day-button'}>
                            Edit
                        </Button>
                        <Button
                            variant={'contained'}
                            disableElevation
                            disabled={true}
                            className={'more-info-button'}>
                            View
                        </Button>
                        <Button
                            variant={'contained'}
                            disableElevation
                            disabled={true}
                            className={'delete-day-button'}>
                            Delete
                        </Button>
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
