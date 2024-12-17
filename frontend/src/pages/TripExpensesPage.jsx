import PageTitle from '../components/common/PageTitle';
import { useLocation, useParams } from 'react-router-dom';
import ExpensesBarChart from '../components/expenses-charts/ExpensesBarChart.jsx';
import ExpensesPieChart from '../components/expenses-charts/ExpensesPieChart.jsx';

function TripExpensesPage() {
    const { trip_id } = useParams();
    const location = useLocation();
    const tripName = location.state?.tripName;
    const tripExpenses = location.state?.tripExpenses;

    const participants = ['Alice', 'Bob', 'Charlie', 'David'];
    const expenses = [120, 150, 80, 200];
    return (
        <>
            <PageTitle title={`Expenses for ${tripName}`} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>
                <h3 style={{ textAlign: 'center' }}>Total expenses for this trip: {tripExpenses}$</h3>
                <ExpensesBarChart participants={participants} expenses={expenses} />
                <ExpensesPieChart />
            </div>
        </>
    );
}

export default TripExpensesPage;
