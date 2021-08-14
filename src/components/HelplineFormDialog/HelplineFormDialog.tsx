import React, { ReactElement, ReactNode } from 'react';
import {
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import { Form } from '@formium/types';
import HelplineForm from '../HelplineForm/HelplineForm';

const fetcher = async (url): Promise<Form> => {
    const data = await fetch(url);
    return data.json();
};

type Props = {
    slug: string;
    open: boolean;
    onClose: () => void;
};

const useStyles = makeStyles((theme) =>
    createStyles({
        dialogPaper: {
            borderRadius: 12,
            [theme.breakpoints.down('xs')]: {
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                margin: 0,
                width: '100%',
            },
        },
        dialogScrollPaper: {
            [theme.breakpoints.down('xs')]: {
                alignItems: 'flex-start',
            },
        },
        dialogPaperScrollPaper: {
            [theme.breakpoints.down('xs')]: {
                maxHeight: '100%',
            },
        },
    }),
);

const HelplineFormDialog = ({ slug, open, onClose: handleClose }: Props): ReactElement => {
    const { data } = useSWR(open ? `/api/forms/${slug}` : null, fetcher);
    const classes = useStyles();

    const Header = ({ page }: { page: { title: string } }): ReactElement => (
        <DialogTitle>
            <Grid container wrap="nowrap" alignItems="center">
                <Grid item xs zeroMinWidth>
                    <Typography variant="h5">{page.title}</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleClose} data-testid="close" name="Close">
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </DialogTitle>
    );

    const ElementsWrapper = ({ children }: { children: ReactNode }): ReactElement => (
        <DialogContent dividers={true}>{children}</DialogContent>
    );

    const FooterWrapper = ({ children }: { children: ReactNode }): ReactElement => (
        <DialogActions>{children}</DialogActions>
    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            classes={{
                paper: classes.dialogPaper,
                scrollPaper: classes.dialogScrollPaper,
                paperScrollPaper: classes.dialogPaperScrollPaper,
            }}
        >
            {data && (
                <HelplineForm
                    form={data}
                    onSuccess={handleClose}
                    components={{ Header, ElementsWrapper, FooterWrapper }}
                />
            )}
        </Dialog>
    );
};

export default HelplineFormDialog;
