import './TripDetailsHeaders.css';

function TripDetailsHeaders() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: '400' }}>Created by: FULL NAME</h3>
            <h3 style={{ margin: '0', fontWeight: '400' }}>START DATE - END DATE</h3>
            <div className={'share-container'}>
                <h3 style={{ padding: '6px 8px', margin: '0', fontWeight: '400', textAlign: 'center' }}>
                    Share
                </h3>
            </div>
        </div>
    );
}

export default TripDetailsHeaders;
