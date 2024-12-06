import { addDays } from 'date-fns';

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

export const calculateJourneyDate = (startDate, dayNumber) => {
    const start = new Date(startDate);
    return addDays(start, dayNumber - 1).toLocaleDateString('en-GB');
};

export const calculateActivityDate = (dateString, dayNumber) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + (dayNumber - 1));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
