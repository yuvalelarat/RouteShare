// eslint-disable-next-line react/prop-types
export default function PageTitle({ title }) {
    return (
        <h2
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 0,
                textAlign: 'center',
            }}>
            {title}
        </h2>
    );
}
