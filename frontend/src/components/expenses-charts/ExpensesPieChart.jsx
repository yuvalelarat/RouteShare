import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// eslint-disable-next-line react/prop-types
function ExpensesRadarChart({ activities }) {
    // eslint-disable-next-line react/prop-types
    const activityTypeMap = activities.reduce((acc, activity) => {
        const { activity_type, cost } = activity;
        if (!acc[activity_type]) {
            acc[activity_type] = 0;
        }
        acc[activity_type] += parseFloat(cost);
        return acc;
    }, {});

    const radarChartData = Object.entries(activityTypeMap).map(([activity_type, totalCost]) => ({
        subject: activity_type,
        A: totalCost,
        fullMark: Math.max(...Object.values(activityTypeMap)),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                    name="Expenses"
                    dataKey="A"
                    stroke="var(--color-darker-blue)"
                    fill="var(--color-blue-symbol)"
                    fillOpacity={0.3}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}

export default ExpensesRadarChart;
