import './TripDetailsHeaders.css';
import Button from '@mui/material/Button';

// eslint-disable-next-line react/prop-types
function TripDetailsHeaders({ tripAdmin, startDate, endDate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`Created by: ${tripAdmin}`}</h3>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`${startDate} - ${endDate}`}</h3>

            <Button variant={'contained'} disableElevation className={'share-container'}>
                Change dates
            </Button>
        </div>
    );
}

export default TripDetailsHeaders;
