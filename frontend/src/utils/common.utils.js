export const stringToUrlFormat = (string) => {
    return string.toLowerCase().replace(' ', '-');
};

export const calculateNumberOfDays = (startDate, endDate) =>{
    if (!startDate || !endDate) {
        return "Invalid dates provided.";
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Invalid date format.";
    }

    const diffInMs = end - start;

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

    return diffInDays >= 0 ? diffInDays : -1;
};