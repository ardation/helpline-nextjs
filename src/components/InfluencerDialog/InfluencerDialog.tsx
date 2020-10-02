import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

interface Influencer {
    name: string;
    message: string;
}

interface Props {
    influencer: Influencer;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            borderRadius: '1000px',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '100%',
            margin: theme.spacing(1, 0, 2, 0),
        },
        dialogPaper: {
            maxWidth: '300px',
        },
        dialogTitle: {
            fontWeight: 'bold',
        },
    }),
);

const InfluencerDialog = ({ influencer }: Props): ReactElement => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClose = (): void => {
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="influencer-dialog-title"
            aria-describedby="influencer-dialog-description"
            classes={{
                paper: classes.dialogPaper,
            }}
        >
            <DialogTitle id="influencer-dialog-title" className={classes.dialogTitle}>
                A Message from {influencer.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="influencer-dialog-description">{influencer.message}</DialogContentText>
                <Button className={classes.button} onClick={handleClose} color="primary" variant="contained">
                    Continue
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default InfluencerDialog;
