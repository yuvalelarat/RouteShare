import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import { EditDayFormDialogTitle } from './EditDayFormDialogTitle.jsx';
import { EditDayFormDialogContent } from './EditDayFormDialogContent.jsx';
import { EditDayFormDialogActions } from './EditDayFormDialogActions.jsx';
import { useEditJourneyMutation } from '../../../redux/rtk/journeyDataApi';
import TripContext from '../../../context/TripContext';
import { calculateDayNumber, formatDate } from '../../../utils/common.utils';

export function EditDayForm({
    open,
    onClose,
    dayNumber,
    date,
    country,
    description,
    startDate,
    endDate,
    journeyId,
}) {
    const { trip_id, newJourneyDetails } = useContext(TripContext);
    const [editJourney] = useEditJourneyMutation();

    const [formState, setFormState] = useState({
        newDate: formatDate(date),
        newLocation: country,
        newDescription: description,
        dateError: false,
        locationError: false,
        localError: null,
        locationHelperText: `${country.length}/30 characters`,
        descriptionHelperText: `${description.length}/120 characters`,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'date':
                setFormState((prev) => ({
                    ...prev,
                    newDate: value,
                    localError: null,
                    dateError: false,
                }));
                break;
            case 'location':
                if (value.length <= 30) {
                    setFormState((prev) => ({
                        ...prev,
                        newLocation: value,
                        locationError: false,
                        locationHelperText: `${value.length}/30 characters`,
                    }));
                }
                break;
            case 'description':
                if (value.length <= 120) {
                    setFormState((prev) => ({
                        ...prev,
                        newDescription: value,
                        descriptionHelperText: `${value.length}/120 characters`,
                    }));
                }
                break;
        }
    };

    const resetStates = () => {
        setFormState({
            newDate: formatDate(date),
            newLocation: country,
            newDescription: description,
            dateError: false,
            locationError: false,
            localError: null,
            locationHelperText: `${country.length}/30 characters`,
            descriptionHelperText: `${description.length}/120 characters`,
        });
    };

    const handleClose = () => {
        resetStates();
        onClose();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let isValid = true;
        const updatedState = { ...formState };

        if (!updatedState.newDate) {
            updatedState.localError = 'Date is required';
            updatedState.dateError = true;
            isValid = false;
        }

        if (!updatedState.newLocation) {
            updatedState.localError = 'Country/City is required';
            updatedState.locationError = true;
            isValid = false;
        }

        const parsedDate = new Date(updatedState.newDate.split('/').reverse().join('-'));
        const parsedStartDate = new Date(startDate.split('/').reverse().join('-'));
        const parsedEndDate = new Date(endDate.split('/').reverse().join('-'));

        if (parsedDate < parsedStartDate || parsedDate > parsedEndDate) {
            updatedState.localError = 'Date is not in the range';
            updatedState.dateError = true;
            isValid = false;
        }

        setFormState(updatedState);

        if (isValid) {
            const newDayNumber = calculateDayNumber(
                new Date(updatedState.newDate).toLocaleDateString('en-GB'),
                startDate,
                endDate,
            );
            const newJourneyData = {
                trip_id,
                journey_id: journeyId,
                day_number: newDayNumber,
                country: updatedState.newLocation,
                description: updatedState.newDescription,
            };

            try {
                await editJourney(newJourneyData).unwrap();
                newJourneyDetails(
                    journeyId,
                    updatedState.newDate,
                    newDayNumber,
                    updatedState.newLocation,
                    updatedState.newDescription,
                );
                onClose();
            } catch (err) {
                console.error('Failed to create journey:', err);
                setFormState((prev) => ({
                    ...prev,
                    localError: err.data?.error || 'An error occurred',
                }));
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <EditDayFormDialogTitle date={date} dayNumber={dayNumber} />
            <EditDayFormDialogContent
                formState={formState}
                handleChange={handleChange}
                startDate={startDate}
                endDate={endDate}
            />
            <EditDayFormDialogActions handleClose={handleClose} handleSave={handleSave} />
        </Dialog>
    );
}

EditDayForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    dayNumber: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    journeyId: PropTypes.string.isRequired,
};
