import React, { ReactElement } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Fab, Grid, Divider, SvgIcon } from '@material-ui/core';
import ReactGA, { outboundLink } from 'react-ga';
import { noop } from 'lodash/fp';
import CallIcon from '../../assets/call-icon.svg';
import TextIcon from '../../assets/text-icon.svg';
import WebchatIcon from '../../assets/webchat-icon.svg';

type Category = {
    name: string;
};

export type Organization = {
    id: string;
    name: string;
    smsNumber?: string;
    phoneNumber?: string;
    chatUrl?: string;
    categories: Category[];
};

type Props = {
    organization: Organization;
    onLink?: () => void;
};

const useStyles = makeStyles((theme) =>
    createStyles({
        fabs: {
            textAlign: 'center',
        },
        fabLabel: {
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            lineHeight: '1rem',
            paddingTop: theme.spacing(1),
        },
        divider: {
            margin: theme.spacing(1, 0, 2),
        },
    }),
);

const OrganizationFab = ({ organization, onLink }: Props): ReactElement => {
    const classes = useStyles();

    const onLinkClick = (label: string, gaEventAction = '') => (): void => {
        const dimension7 = organization.categories.map(({ name }) => name).join(', ');

        ReactGA.event({
            category: 'Helpline Card Engagement',
            action: gaEventAction,
            label: label,
            dimension6: organization.name,
            dimension7: dimension7,
        });

        onLink?.();
        outboundLink({ label }, noop);
    };

    return (
        <>
            {(organization.smsNumber || organization.phoneNumber || organization.chatUrl) && (
                <>
                    <Divider className={classes.divider} />
                    <Grid container className={classes.fabs} data-testid="fabs">
                        {organization.smsNumber && (
                            <Grid item xs={4}>
                                <Fab
                                    color="primary"
                                    aria-label="text"
                                    data-testid="smsNumberFab"
                                    onClick={onLinkClick(`sms:${organization.smsNumber}`, 'SMS Button')}
                                    href={`sms:${organization.smsNumber}`}
                                    target="_parent"
                                    rel="noopener noreferrer"
                                >
                                    <SvgIcon>
                                        <TextIcon />
                                    </SvgIcon>
                                </Fab>
                                <Typography className={classes.fabLabel}>Text</Typography>
                            </Grid>
                        )}
                        {organization.phoneNumber && (
                            <Grid item xs={4}>
                                <Fab
                                    color="primary"
                                    aria-label="call"
                                    data-testid="phoneNumberFab"
                                    onClick={onLinkClick(`tel:${organization.phoneNumber}`, 'Call Button')}
                                    href={`tel:${organization.phoneNumber}`}
                                    target="_parent"
                                    rel="noopener noreferrer"
                                >
                                    <SvgIcon>
                                        <CallIcon />
                                    </SvgIcon>
                                </Fab>
                                <Typography className={classes.fabLabel}>Call</Typography>
                            </Grid>
                        )}
                        {organization.chatUrl && (
                            <Grid item xs={4}>
                                <Fab
                                    color="primary"
                                    aria-label="web chat"
                                    data-testid="chatUrlFab"
                                    onClick={onLinkClick(organization.chatUrl, 'Chat Button')}
                                    href={organization.chatUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SvgIcon>
                                        <WebchatIcon />
                                    </SvgIcon>
                                </Fab>
                                <Typography className={classes.fabLabel}>Web Chat</Typography>
                            </Grid>
                        )}
                    </Grid>
                </>
            )}
        </>
    );
};

export default OrganizationFab;
