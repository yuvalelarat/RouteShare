import PageTitle from '../../components/common/PageTitle.jsx';
import { useLocation, useParams } from 'react-router-dom';
import DynamicExpensesBarChart from '../../components/expenses-charts/DynamicExpensesBarChart.jsx';
import { useLazyGetParticipantsQuery } from '../../redux/rtk/participantsDataApi.js';
import { useGetActivitiesByTripIdQuery } from '../../redux/rtk/activityDataApi.js';
import './TripExpensesPage.css';

import { useEffect } from 'react';

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
        data?.participants.map((participant) => ({
            name: `${participant.first_name} ${participant.last_name}`,
            expenses: parseFloat(participant.expenses),
        })) || [];

    const activitiesData = tripActivities?.response?.activities || [];

    return (
        <>
            <PageTitle title={`Expenses for ${tripName}`} />
            <h3 className={'expenses-headings'}>Total expenses for this trip: {tripExpenses}$</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 className={'expenses-headings'}>Participants expenses:</h3>
                <DynamicExpensesBarChart type="participants" data={participants} />
                <h3 className={'expenses-headings'}>Expenses by activity type:</h3>
                <DynamicExpensesBarChart type="activities" data={activitiesData} />
            </div>
        </>
    );
}

export default TripExpensesPage;
