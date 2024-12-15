import Button from '@mui/material/Button';
import DeleteDialog from '../../common/DeleteDialog.jsx';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function RemoveSharedTrip({ handleDelete, tripId, email }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmDelete = () => {
        handleDelete(tripId, email);
        handleClose();
    };

    return (
        <>
            <Button variant={'contained'} disableElevation className={'delete-button'} onClick={handleOpen}>
                Remove
            </Button>
            <DeleteDialog
                open={open}
                close={handleClose}
                handleDelete={confirmDelete}
                dialogTitle={'Remove trip'}
                dialogContentText={
                    'Are you sure you want to remove yourself from this trip? This action is irreversible and will remove you from the trip permanently.'
                }
                remove={true}
            />
        </>
    );
}

export default RemoveSharedTrip;
