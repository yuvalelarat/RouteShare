export const stringToUrlFormat = (string) => {
    return string.toLowerCase().replace(' ', '-');
};

export const calculateNumberOfDays = (startDate, endDate) => {
    if (!startDate || !endDate) {
        return 'Invalid dates provided.';
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 'Invalid date format.';
    }

    const diffInMs = end - start;

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

    return diffInDays >= 0 ? diffInDays : -1;
};

export const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
};

export const calculateDayNumber = (selectedDate, startDate, endDate) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const selected = parseDate(selectedDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected < start || selected > end) {
        return 'Selected date is out of range';
    }

    const dayNumber = (selected - start) / (1000 * 60 * 60 * 24) + 1;

    return dayNumber;
};
