import Button from '@mui/material/Button';
import DeleteDialog from '../../common/DeleteDialog.jsx';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function DeleteDay({ handleDelete }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant={'contained'}
                disableElevation
                className={'delete-day-button'}
                onClick={handleOpen}>
                Delete
            </Button>
            <DeleteDialog
                open={open}
                close={handleClose}
                handleDelete={handleDelete}
                dialogTitle={'Delete day'}
                dialogContentText={
                    'Are you sure you want to delete this day? It will also delete all the activities in this day and cannot be undone.'
                }
            />
        </>
    );
}

export default DeleteDay;
