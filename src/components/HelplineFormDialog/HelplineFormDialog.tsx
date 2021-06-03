import React, { ReactElement } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
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

const HelplineFormDialog = ({ slug, open, onClose: handleClose }: Props): ReactElement => {
    const { data } = useSWR(open ? `/api/forms/${slug}` : null, fetcher);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Grid container wrap="nowrap" alignItems="center">
                    <Grid item xs zeroMinWidth>
                        <Typography noWrap variant="h5">
                            {data?.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleClose} data-testid="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers={true}>
                {data && <HelplineForm form={data} onSuccess={handleClose} />}
            </DialogContent>
        </Dialog>
    );
};

export default HelplineFormDialog;
