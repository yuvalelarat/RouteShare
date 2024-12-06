// eslint-disable-next-line react/prop-types
function DayActivitiesHeaders({ country }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: '400' }}>{` Location: ${country}`}</h3>
        </div>
    );
}
export default DayActivitiesHeaders;
