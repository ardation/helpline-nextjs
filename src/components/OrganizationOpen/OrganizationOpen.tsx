import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Chip } from '@material-ui/core';
import { useTimeout } from 'beautiful-react-hooks';
import isOpen, { IsOpenStatus } from '../../util/isOpen';

type OpeningHour = {
    day: string;
    open: string;
    close: string;
};

type Organization = {
    alwaysOpen: boolean;
    openingHours: OpeningHour[];
    timezone: string;
};

type Props = {
    organization: Organization;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 'inherit',
        },
        open: {
            color: '#3FA607',
            fontWeight: 'bold',
        },
        chip: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            backgroundColor: theme.palette.secondary.main,
            marginLeft: theme.spacing(1),
        },
    }),
);

const OrganizationOpen = ({ organization }: Props): ReactElement => {
    const classes = useStyles();
    const [openStatus, setOpenStatus] = useState<IsOpenStatus>(isOpen(organization));

    if (!organization.alwaysOpen) {
        useTimeout(() => setOpenStatus(isOpen(organization)), 1000);
    }

    return (
        <Typography className={classes.body} component="div">
            {organization.alwaysOpen && (
                <>
                    <span className={classes.open}>Open</span>{' '}
                    <Chip size="small" className={classes.chip} label="24/7" />
                </>
            )}
            {!organization.alwaysOpen && (
                <>
                    {openStatus.open && (
                        <>
                            <span className={classes.open}>Open</span> &nbsp;&middot;&nbsp;{' '}
                            <span>
                                {openStatus.openTime.local().format('h:mm A')} -{' '}
                                {openStatus.closeTime.local().format('h:mm A')}
                            </span>
                        </>
                    )}
                    {!openStatus.open && <span>Closed</span>}
                </>
            )}
        </Typography>
    );
};

export default OrganizationOpen;
