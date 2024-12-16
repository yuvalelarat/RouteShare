import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, Fragment, useEffect, useState } from 'react';
import { useLazyGetParticipantsQuery } from '../../../redux/rtk/participantsDataApi.js';
import { useSelector } from 'react-redux';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './EditSharingDialog.css';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
// eslint-disable-next-line react/prop-types
function EditSharingDialog({ tripId }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const currentUserEmail = useSelector((state) => state.userData.email);
    const [getParticipants, { data: ParticipantsData, error: ParticipantsError, isLoading }] =
        useLazyGetParticipantsQuery();

    const noParticipants = ParticipantsData?.participants.length - 1 === 0;

    const handleChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

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
        setEmail('');
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
                <DialogTitle style={{ fontWeight: '600' }}>{'Edit trip participants'}</DialogTitle>
                <DialogContent>
                    <h4 style={{ fontWeight: '600' }}>Add participants to the trip by email:</h4>
                    <div className={'share-div'}>
                        <TextField
                            style={{ width: '100%', minWidth: 150 }}
                            label={'email to share'}
                            value={email}
                            onChange={handleChange}
                            variant="outlined"
                            type={'email'}
                            margin={'none'}
                        />
                        <FormControl
                            sx={{ minWidth: 150 }}
                            size="medium"
                            margin={'none'}
                            variant={'outlined'}>
                            <InputLabel id="demo-select-small-label">Role</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                name="role"
                                label="role">
                                <MenuItem value="view">View</MenuItem>
                                <MenuItem value="edit">Edit</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={handleClickOpen} sx={{ color: 'black' }}>
                            <PersonAddAltTwoToneIcon />
                        </IconButton>
                    </div>
                    <h4 style={{ fontWeight: '600' }}>Participants:</h4>
                    {noParticipants && <p>No participants have been shared yet</p>}{' '}
                    {ParticipantsData?.participants
                        .filter((participant) => participant.email !== currentUserEmail)
                        .map((participant, index) => (
                            <div
                                key={index}
                                value={participant.user_id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    borderBottom: '1px solid black',
                                    paddingBottom: '8px',
                                    marginBottom: '8px',
                                }}>
                                <p style={{ margin: '0', width: '50%' }} key={index}>
                                    {`${participant.first_name} ${participant.last_name}`}
                                </p>
                                <FormControl
                                    sx={{ minWidth: 100 }}
                                    size="small"
                                    margin={'none'}
                                    variant={'outlined'}>
                                    <InputLabel id="demo-select-small-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        name="role"
                                        value={participant.role}
                                        label="role">
                                        <MenuItem value="view">View</MenuItem>
                                        <MenuItem value="edit">Edit</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton onClick={handleClickOpen} sx={{ color: 'black' }}>
                                    <PersonRemoveTwoToneIcon />
                                </IconButton>
                            </div>
                        ))}
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default EditSharingDialog;
