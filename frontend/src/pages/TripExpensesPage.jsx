import PageTitle from '../components/common/PageTitle';
import { useLocation, useParams } from 'react-router-dom';
import ExpensesBarChart from '../components/expenses-charts/ExpensesBarChart.jsx';
import ExpensesPieChart from '../components/expenses-charts/ExpensesPieChart.jsx';
import { useLazyGetParticipantsQuery } from '../redux/rtk/participantsDataApi.js';
import { useGetActivitiesByTripIdQuery } from '../redux/rtk/activityDataApi.js';

import { useEffect } from 'react';
import TestChart from '../components/expenses-charts/TestChart.jsx';

function TripExpensesPage() {
    const { trip_id } = useParams();
    const location = useLocation();
    const tripName = location.state?.tripName;
    const tripExpenses = location.state?.tripExpenses || 0;
    const [getParticipants, { data, error, isLoading }] = useLazyGetParticipantsQuery();
    const { data: tripActivities } = useGetActivitiesByTripIdQuery(trip_id);

    useEffect(() => {
        if (trip_id) {
            getParticipants(trip_id);
        }
    }, [trip_id, getParticipants]);

    const participants =
        data?.participants.map((participant) => `${participant.first_name} ${participant.last_name}`) || [];
    const expenses = data?.participants.map((participant) => parseFloat(participant.expenses)) || [];

    const activitiesData = tripActivities?.response?.activities || [];

    console.log(activitiesData);

    return (
        <>
            <PageTitle title={`Expenses for ${tripName}`} />
            <h3 style={{ textAlign: 'center' }}>Total expenses for this trip: {tripExpenses}$</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ExpensesBarChart participants={participants} expenses={expenses} />
                <TestChart activities={activitiesData} />
                <ExpensesPieChart activities={activitiesData} />
            </div>
        </>
    );
}

export default TripExpensesPage;
