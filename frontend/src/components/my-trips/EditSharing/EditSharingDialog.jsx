import React, { Fragment, useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Slide } from '@mui/material';
import { forwardRef } from 'react';
import ParticipantManagement from './ParticipantManagement';
import ParticipantList from './ParticipantList';
import { CustomAlert } from '../../common/CustomAlert.jsx';
import { useLazyGetParticipantsQuery } from '../../../redux/rtk/participantsDataApi.js';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line react/prop-types
function EditSharingDialog({ tripId }) {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('success');
    const [getParticipants, { data: ParticipantsData }] = useLazyGetParticipantsQuery();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAlertClose = () => setAlertOpen(false);

    useEffect(() => {
        if (tripId) {
            getParticipants(tripId);
        }
    }, [tripId, getParticipants]);

    const refetchParticipants = () => {
        getParticipants(tripId);
    };

    const handleAlertTrigger = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertOpen(true);
    };

    return (
        <Fragment>
            <Button variant="outlined" disableElevation className={'share-button'} onClick={handleClickOpen}>
                Edit Sharing
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="sm"
                fullWidth>
                <DialogTitle style={{ fontWeight: '600' }}>Edit trip participants</DialogTitle>
                <DialogContent>
                    <ParticipantManagement
                        tripId={tripId}
                        onAlertTrigger={handleAlertTrigger}
                        refetchParticipants={refetchParticipants}
                    />
                    <ParticipantList tripId={tripId} onAlertTrigger={handleAlertTrigger} />
                </DialogContent>
                <CustomAlert
                    type={alertType}
                    message={alertMessage}
                    open={alertOpen}
                    handleClose={handleAlertClose}
                />
            </Dialog>
        </Fragment>
    );
}

export default EditSharingDialog;
