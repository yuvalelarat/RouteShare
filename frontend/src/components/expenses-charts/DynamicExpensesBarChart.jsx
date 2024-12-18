import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// eslint-disable-next-line react/prop-types
function DynamicExpensesBarChart({ type, data }) {
    let chartData;

    if (type === 'participants') {
        chartData = data.map((item, index) => ({
            name: item.name,
            expenses: item.expenses,
        }));
    } else if (type === 'activities') {
        const activityTypeMap = data.reduce((acc, activity) => {
            const { activity_type, cost } = activity;
            if (!acc[activity_type]) {
                acc[activity_type] = 0;
            }
            acc[activity_type] += parseFloat(cost);
            return acc;
        }, {});

        chartData = Object.entries(activityTypeMap).map(([activity_type, totalCost]) => ({
            name: activity_type,
            expenses: totalCost,
        }));
    }

    return (
        <ResponsiveContainer width="70%" height={300}>
            <BarChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={{ fontSize: '14px' }} />
                <YAxis tickFormatter={(value) => `$${value}`} style={{ fontSize: '14px' }} />
                <Tooltip formatter={(value) => `$${value}`} contentStyle={{ fontSize: '14px' }} />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar
                    dataKey="expenses"
                    fill="var(--color-dark-black)"
                    stroke="var(--color-dark-black)"
                    activeBar={<Rectangle fill="var(--color-blue-symbol)" />}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default DynamicExpensesBarChart;
