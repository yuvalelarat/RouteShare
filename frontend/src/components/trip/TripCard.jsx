import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import './TripCard.css';

{/*TODO: Responsive for phones*/
}

function LoginCard() {
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
                <CardActions
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>Expenses: 100$</h3>
                    <button style={{
                        border: 'none',
                        fontFamily: 'inherit',
                        fontWeight: '400',
                        fontSize: 'medium',
                        padding: '6px 8px',
                        margin: '0',
                        display: 'flex',
                        alignItems: 'center',
                        outline: '1px solid black',
                        borderRadius: '5px',
                        backgroundColor: 'var(--color-blue-symbol)',
                        cursor: 'pointer'
                    }}>
                        More info
                    </button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default LoginCard;
