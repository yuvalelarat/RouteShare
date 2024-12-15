import Button from '@mui/material/Button';
import DeleteDialog from '../../common/DeleteDialog.jsx';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function DeleteDay({ handleDelete, tripId }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmDelete = () => {
        handleDelete(tripId);
        handleClose();
    };

    return (
        <>
            <Button variant={'contained'} disableElevation className={'delete-button'} onClick={handleOpen}>
                Delete
            </Button>
            <DeleteDialog
                open={open}
                close={handleClose}
                handleDelete={confirmDelete}
                dialogTitle={'Delete trip'}
                dialogContentText={
                    'Are you sure you want to delete this trip? This action will also delete all the data associated with this trip and cannot be undone.'
                }
            />
        </>
    );
}

export default DeleteDay;
