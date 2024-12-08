import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { cardContentStyle } from '../styles.js';
import CardActions from '@mui/material/CardActions';
import {
    cardStyle,
    circleStyle,
    headerStyle,
    boxStyle,
    cardActionsStyle,
    circleContainerStyle,
} from './styles.js';
import Button from '@mui/material/Button';
import { useState } from 'react';
import NewActivityForm from '../NewActivityForm/NewActivityForm.jsx';

// eslint-disable-next-line react/prop-types
function BluredCard({ date, country }) {
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
                    <h3 style={{ fontWeight: '600', margin: '0' }}>Activity name</h3>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>Location</h3>
                    <div className={'activity-description-div'}>
                        <p style={{ margin: '0' }}>
                            ere will be description of the activity and you can tell all you want about it,
                            and what you want about it.
                        </p>
                    </div>
                    <h3 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>
                        Activity type: Other
                    </h3>
                    <h3 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>Cost: 125$</h3>
                    <h3 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>Who pays: idontknow</h3>
                </CardContent>
                <CardActions style={cardActionsStyle}>
                    <div className={'activity-action-style'}>
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
                        Add activity
                    </Button>
                </div>
            </div>
            {/*TODO: add AddDayForm*/}
            <NewActivityForm open={open} onClose={handleClose} date={date} country={country} />
        </Box>
    );
}

export default BluredCard;