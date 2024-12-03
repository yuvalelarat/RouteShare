import './TripDetailsHeaders.css';

function TripDetailsHeaders() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: '400' }}>Created by: FULL NAME</h3>
            <h3 style={{ margin: '0', fontWeight: '400' }}>START DATE - END DATE</h3>
            <button className={'share-container'}>
                Share

            </button>
        </div>
    );
}

export default TripDetailsHeaders;
