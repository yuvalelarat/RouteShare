import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import './TripCard.css';
import CardContent from '@mui/material/CardContent';
import { cardContentStyle } from './styles.js';
import CardActions from '@mui/material/CardActions';

function AddLoginCard() {
    const boxStyle = {
        width: '20vw',
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
        padding: '24px',
        boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.2)',
        margin: '0',
        outline: '1px solid var(--color-lightgray-outline)',
        borderRadius: '8px',
        backgroundColor: 'var(--color-lightgray)',
        filter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    };

    const circleStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-lightgreen-button-save)',
        outline: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
    };

    const headerStyle = {
        fontWeight: '600',
        margin: '0'
    };

    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h2 style={{ fontWeight: '400', margin: '0' }}>28/08/2024 - Day 1</h2>
                    <h2 style={{ fontWeight: '400', margin: '0' }}>Iceland</h2>
                    <div style={{
                        outline: '1px solid black',
                        borderRadius: '10px',
                        height: '10rem',
                        textAlign: 'left',
                        padding: '0.5rem'
                    }}>
                        <p style={{ margin: '0' }}>here will be description of the day</p>
                    </div>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>Expenses: 100$</h3>
                    <div style={{
                        margin: '0.5rem',
                        marginBottom: '0',
                        display: 'flex',
                        alignItems: 'center',
                        outline: '1px solid black',
                        borderRadius: '5px',
                        backgroundColor: 'var(--color-blue-symbol)',
                        cursor: 'pointer'
                    }}>
                        <h3 style={{
                            padding: '6px 8px',
                            margin: '0',
                            fontWeight: '400',
                            textAlign: 'center'
                        }}>
                            More info
                        </h3>
                    </div>
                </CardActions>
            </Card>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '2'
            }}>
                <div style={circleStyle}>
                    <h3 style={headerStyle}>Add day</h3></div>
            </div>
        </Box>
    );
}

export default AddLoginCard;