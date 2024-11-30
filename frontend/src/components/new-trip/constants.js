const localToday = new Date();
export const today = localToday.toLocaleDateString('en-CA');

export const fields = [
    {
        id: 'trip-name',
        label: 'Trip name*',
        type: 'text',
        valueKey: 'tripName',
        errorKey: 'tripName',
        multiline: true,
        maxLength: 29,
        helperText: (value) => `${value.length}/29 characters`
    },
    {
        id: 'start-date',
        label: 'Start Date*',
        type: 'date',
        valueKey: 'startDate',
        errorKey: 'startDate',
        multiline: false,
        min: today
    },
    {
        id: 'end-date',
        label: 'End Date*',
        type: 'date',
        valueKey: 'endDate',
        errorKey: 'endDate',
        multiline: false,
        getMin: (formValues) => formValues.startDate || today
    },
    {
        id: 'description',
        label: 'Description',
        type: 'text',
        valueKey: 'description',
        errorKey: 'tripName',
        multiline: true,
        rows: 5,
        maxLength: 350,
        helperText: (value) => `${value.length}/350 characters`
    }
];
