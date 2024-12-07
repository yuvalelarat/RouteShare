import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function NewActivityForm({ open, onClose, date, country }) {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Add an activity in ${country} on ${date}.`}</DialogContentText>
                <TextField
                    autoFocus
                    required
                    id="ActivityName"
                    name="ActivityName"
                    label="Activity name"
                    fullWidth
                    variant="standard"
                />
                <FormControl sx={{ minWidth: 120, marginTop: '2rem' }} size="small">
                    <InputLabel id="demo-select-small-label">Who pays?</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={'none yet'}
                        label="Who pays?">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}
