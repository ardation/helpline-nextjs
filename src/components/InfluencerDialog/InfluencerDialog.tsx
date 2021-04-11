import { Dialog, DialogContent, DialogTitle, Button, makeStyles, createStyles, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';

interface Influencer {
    name: string;
    message: string;
}

interface Props {
    influencer: Influencer;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            margin: theme.spacing(2, 0),
        },
        dialogPaper: {
            maxWidth: '300px',
            borderRadius: 12,
        },
        dialogTitle: {
            paddingBottom: 0,
        },
        dialogText: {
            '& p:first-child': {
                marginTop: 0,
            },
            '& p:last-child': {
                marginBottom: 0,
            },
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
                <Typography id="influencer-dialog-description" component="div" className={classes.dialogText}>
                    {influencer.message.split('\n').map((str, index) => (
                        <p key={index}>{str}</p>
                    ))}
                </Typography>
                <Button
                    className={classes.button}
                    onClick={handleClose}
                    color="primary"
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<ArrowRightAltRoundedIcon />}
                >
                    Continue
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default InfluencerDialog;
