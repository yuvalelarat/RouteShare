import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './DayActivitiesHeaders.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function DayActivitiesHeaders({ country }) {
    const { trip_id } = useParams();
    const navigate = useNavigate();
    console.log(trip_id);
    const handleBack = () => {
        navigate(`/trip/${trip_id}`);
    };
    return (
        <div className="day-activities-header">
            <h3 className="location-header">{` Location: ${country}`}</h3>
            <Button className="back-button" onClick={handleBack}>
                <ArrowBackIcon />
                Back
            </Button>
        </div>
    );
}
export default DayActivitiesHeaders;
