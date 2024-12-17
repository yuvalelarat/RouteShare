import PageTitle from '../components/common/PageTitle';
import { useLocation, useParams } from 'react-router-dom';

function TripExpensesPage() {
    const { trip_id } = useParams();
    const location = useLocation();
    const tripName = location.state?.tripName;
    return (
        <>
            <PageTitle title={`Expenses for ${tripName}`} />
        </>
    );
}

export default TripExpensesPage;
