import PageTitle from '../common/PageTitle.jsx';
import { Box } from '@mui/material';
import { boxStyle } from './styles.js';
import './MyTrips.css';
import MyTripsArea from './MyTripsArea.jsx';
import SharedTripsArea from './SharedTripsArea.jsx';

function TripCard() {
    return (
        <>
            <Box sx={boxStyle}>
                <MyTripsArea />
            </Box>
            <PageTitle title={'Trips shared with me'} />
            <Box sx={boxStyle}>
                <SharedTripsArea />
            </Box>
        </>
    );
}

export default TripCard;
