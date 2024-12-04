import './TripDetailsHeaders.css';
import Button from '@mui/material/Button';

// eslint-disable-next-line react/prop-types
function TripDetailsHeaders({ tripAdmin, startDate, endDate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`Created by: ${tripAdmin}`}</h3>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`${startDate} - ${endDate}`}</h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <Button variant="contained" disableElevation className={'edit-trip-details-button'}>
                    Edit trip details
                </Button>
            </div>
        </div>
    );
}

export default TripDetailsHeaders;
