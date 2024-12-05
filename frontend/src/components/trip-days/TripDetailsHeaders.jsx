import './TripDetailsHeaders.css';

// eslint-disable-next-line react/prop-types
function TripDetailsHeaders({ tripAdmin, startDate, endDate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`Created by: ${tripAdmin}`}</h3>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`${startDate} - ${endDate}`}</h3>
            {/*            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <Button variant="contained" disableElevation className={'edit-trip-details-button'}>
                    Edit trip details
                </Button>
            </div>*/}{' '}
            {/*TODO: Implement edit trip details????? it will be bad dates for days cards!!!*/}
        </div>
    );
}

export default TripDetailsHeaders;
