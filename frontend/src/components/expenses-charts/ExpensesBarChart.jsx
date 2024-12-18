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
function ExpensesBarChart({ participants, expenses }) {
    // eslint-disable-next-line react/prop-types
    const data = participants.map((participant, index) => ({
        name: participant,
        expenses: expenses[index],
    }));

    return (
        <ResponsiveContainer width="70%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <XAxis dataKey="name" style={{ fontSize: '14px' }} />
                <YAxis tickFormatter={(value) => `$${value}`} style={{ fontSize: '14px' }} />
                <Tooltip formatter={(value) => `$${value}`} contentStyle={{ fontSize: '14px' }} />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar
                    dataKey="expenses"
                    fill="var(--color-darker-blue)"
                    activeBar={<Rectangle fill="var(--color-blue-symbol)" />}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ExpensesBarChart;
