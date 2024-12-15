import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, Fragment, useEffect, useState } from 'react';
import { useLazyGetParticipantsQuery } from '../../../redux/rtk/participantsDataApi.js';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import './EditSharingDialog.css';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
// eslint-disable-next-line react/prop-types
function EditSharingDialog({ tripId }) {
    const [open, setOpen] = useState(false);
    const currentUserEmail = useSelector((state) => state.userData.email);
    const [getParticipants, { data: ParticipantsData, error: ParticipantsError, isLoading }] =
        useLazyGetParticipantsQuery();

    const noParticipants = ParticipantsData?.participants.length - 1 === 0;

    useEffect(() => {
        if (tripId) {
            getParticipants(tripId);
        }
    }, [tripId, getParticipants]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(currentUserEmail);

    return (
        <Fragment>
            <Button variant="contained" disableElevation className={'share-button'} onClick={handleClickOpen}>
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
                <DialogTitle style={{ fontWeight: '600' }}>{'Edit trip participants'}</DialogTitle>
                <DialogContent>
                    <h4 style={{ fontWeight: '600' }}>Add participants by email to the trip:</h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <TextField
                            style={{ width: '100%' }}
                            label={'email to share'}
                            variant="outlined"
                            type={'email'}
                            margin={'none'}
                        />
                        <Button
                            variant={'contained'}
                            size={'small'}
                            disableElevation
                            className={'share-button'}>
                            Share
                        </Button>
                    </div>
                    <h4 style={{ fontWeight: '600' }}>Remove participants of the trip:</h4>
                    {noParticipants && <p>No participants have been shared yet</p>}{' '}
                    {ParticipantsData?.participants
                        .filter((participant) => participant.email !== currentUserEmail)
                        .map((participant, index) => (
                            <p style={{ margin: '0' }} key={index} value={participant.user_id}>
                                {`${participant.first_name} ${participant.last_name}`}
                            </p>
                        ))}
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default EditSharingDialog;
