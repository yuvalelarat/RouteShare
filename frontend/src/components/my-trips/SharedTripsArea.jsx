import Button from '@mui/material/Button';
import './MyTrips.css';
import { cardContentStyle, cardStyle } from './styles.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function SharedTripsArea() {
    return (
        <Card sx={cardStyle}>
            <CardContent sx={cardContentStyle}>
                <div className={'trip-details'}>
                    <h3 style={{ margin: '0px' }}>trip name</h3>
                    <h3 style={{ margin: '0px' }}>
                        <span style={{ fontWeight: 'normal' }}>Start Date</span>&nbsp;-
                        &nbsp;
                        <span style={{ fontWeight: 'normal' }}>End Date</span>
                    </h3>
                </div>
                <div className={'shared-trip-role-and-creator'}>
                    <h3 style={{ margin: '0px' }}>Created by: <br /> Yuval Elarat</h3>
                    <h3 style={{ margin: '0px' }}>Role: <br /> View</h3>
                </div>
                <div className={'buttonDiv'}>
                    <Button variant="contained" disableElevation className={'view-edit-button'}>
                        View & Edit {/*TODO: or View only if his role is only "View" */}
                    </Button>
                    <Button variant="contained" disableElevation className={'expenses-button'}>
                        Expenses
                    </Button>
                    <Button variant="contained" disableElevation className={'delete-button'}>
                        Remove
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default SharedTripsArea;
