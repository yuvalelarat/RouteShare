import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

// eslint-disable-next-line react/prop-types
function ExpensesPieChart({ activities }) {
    // eslint-disable-next-line react/prop-types
    const activityTypeMap = activities.reduce((acc, activity) => {
        const { activity_type, cost } = activity;
        if (!acc[activity_type]) {
            acc[activity_type] = 0;
        }
        acc[activity_type] += parseFloat(cost);
        return acc;
    }, {});

    const pieChartData = Object.entries(activityTypeMap).map(([activity_type, totalCost]) => ({
        name: activity_type,
        value: totalCost,
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip formatter={(value) => `${value}$`} />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default ExpensesPieChart;
