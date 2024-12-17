import { BarChart } from '@mui/x-charts/BarChart';
import { useMediaQuery } from '@mui/material';

// eslint-disable-next-line react/prop-types
function ExpensesBarChart({ participants, expenses }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isSmallerScreen = useMediaQuery('(max-width:450px)');

    const chartWidth = isSmallScreen
        ? isSmallerScreen
            ? window.innerWidth * 0.7
            : window.innerWidth * 0.9
        : 600;

    const chartHeight = isSmallScreen ? (isSmallerScreen ? 150 : 200) : 300;

    return (
        <BarChart
            series={[
                {
                    data: expenses,
                    color: 'var(--color-blue-symbol)',
                    valueFormatter: (value) => (value != null ? `$${value.toLocaleString()}` : '$0'),
                },
            ]}
            height={chartHeight}
            width={chartWidth}
            xAxis={[{ data: participants, scaleType: 'band' }]}
            yAxis={[
                {
                    valueFormatter: (value) => (value != null ? `$${value.toLocaleString()}` : '$0'),
                },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    );
}

export default ExpensesBarChart;
