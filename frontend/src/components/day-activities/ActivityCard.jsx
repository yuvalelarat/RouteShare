import { Box } from '@mui/material';
import { boxStyle, cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ActivityCard() {
    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                    <h3 style={{ fontWeight: '600', margin: '0' }}>Activity Name</h3>
                    <h3 style={{ fontWeight: '400', margin: '0' }}>Activity Location</h3>
                    <div className={'description-div'}>
                        <p style={{ margin: '0' }}>Activity Description</p>
                    </div>
                    <h4 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>Cost: 100$</h4>
                    <h4 style={{ fontWeight: '400', margin: '0', textAlign: 'left' }}>
                        Who pays: USERS DROPDOWN NONE EVEN PAY
                    </h4>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ActivityCard;
