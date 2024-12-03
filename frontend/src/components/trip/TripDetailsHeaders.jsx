import './TripDetailsHeaders.css';

// eslint-disable-next-line react/prop-types
function TripDetailsHeaders({ tripAdmin, startDate, endDate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`Created by: ${tripAdmin}`}</h3>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{`${startDate} - ${endDate}`}</h3>

            <button className={'share-container'}>
                Change dates
            </button>
        </div>
    );
}

export default TripDetailsHeaders;
