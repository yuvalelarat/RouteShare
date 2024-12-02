import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import './TripCard.css';

function AddLoginCard() {
    const boxStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '16px',
        position: 'relative'
    };

    const cardStyle = {
        minWidth: 210,
        width: '20vw',
        height: 400,
        marginTop: 3,
        outline: '1px solid var(--color-lightgray-outline)',
        borderRadius: '8px',
        backgroundColor: 'var(--color-lightgray)',
        padding: 3,
        filter: 'blur(2px)'
    };

    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
            </Card>
        </Box>
    );
}

export default AddLoginCard;
