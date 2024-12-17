import PageTitle from '../components/common/PageTitle';
import { useLocation, useParams } from 'react-router-dom';

function TripExpensesPage() {
    const { trip_id } = useParams();
    const location = useLocation();
    const tripName = location.state?.tripName;
    const tripExpenses = location.state?.tripExpenses;
    return (
        <>
            <PageTitle title={`Expenses for ${tripName}`} />
            <p>{tripExpenses}</p>
        </>
    );
}

export default TripExpensesPage;
