import { Dialog, DialogContent, DialogTitle, Button, makeStyles, createStyles, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import HelplineFormDialog from '../HelplineFormDialog';

interface Influencer {
    name: string;
    message: string;
}

interface Props {
    influencer: Influencer;
}

const useStyles = makeStyles((theme) =>
    createStyles({
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
        buttonRoot: {
            margin: theme.spacing(1, 0),
            color: theme.palette.text.primary,
            textDecoration: 'underline',
            textTransform: 'none',
            fontWeight: 'normal',
            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            },
        },
        link: {
            color: theme.palette.text.primary,
        },
    }),
);

const InfluencerDialog = ({ influencer }: Props): ReactElement => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
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
                    <Typography
                        id="influencer-dialog-description"
                        component="div"
                        className={classes.dialogText}
                        gutterBottom
                    >
                        {influencer.message.split('\n').map((str, index) => (
                            <p key={index}>{str}</p>
                        ))}
                    </Typography>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        variant="contained"
                        fullWidth
                        size="large"
                        endIcon={<ArrowRightAltRoundedIcon />}
                    >
                        Continue
                    </Button>
                    <Button
                        classes={{ root: classes.buttonRoot, label: classes.link }}
                        color="primary"
                        onClick={(): void => {
                            setFeedbackOpen(true);
                            setOpen(false);
                        }}
                        fullWidth
                    >
                        Get your own personalized link
                    </Button>
                </DialogContent>
            </Dialog>
            <HelplineFormDialog
                open={feedbackOpen}
                slug="find-a-helpline-landing-page"
                onClose={(): void => setFeedbackOpen(false)}
            />
        </>
    );
};

export default InfluencerDialog;
