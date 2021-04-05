import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Box, Fab, NoSsr, Tooltip, Grid, Divider, SvgIcon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';
import Link from 'next/link';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TextTruncate from 'react-text-truncate';
import ReactGA, { outboundLink } from 'react-ga';
import { noop } from 'lodash/fp';
import OrganizationOpen from '../OrganizationOpen';
import Chips from '../Chips';
import OrganizationRating from '../OrganizationRating';
import ReviewDialog from '../ReviewDialog';
import CallIcon from '../../assets/call-icon.svg';
import TextIcon from '../../assets/text-icon.svg';
import WebchatIcon from '../../assets/webchat-icon.svg';
import VerifyIcon from '../../assets/verify-icon.svg';

type OpeningHour = {
    day: string;
    open: string;
    close: string;
};

type HumanSupportType = {
    name: string;
};

type Category = {
    name: string;
};

type Topic = {
    name: string;
};

export type Organization = {
    id: string;
    slug: string;
    name: string;
    alwaysOpen: boolean;
    humanSupportTypes: HumanSupportType[];
    categories: Category[];
    openingHours: OpeningHour[];
    topics: Topic[];
    smsNumber?: string;
    phoneNumber?: string;
    url?: string;
    chatUrl?: string;
    timezone: string;
    featured: boolean;
    verified: boolean;
    rating: number;
    reviewCount: number;
};

type Props = {
    organization: Organization;
    variant?: 'widget';
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            borderRadius: '10px',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        },
        grid: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
        },
        header: {
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            marginLeft: theme.spacing(1),
            gridGap: theme.spacing(1),
        },
        heading: {
            '& a': {
                fontFamily: theme.typography.fontFamily,
                fontWeight: 600,
                textDecoration: 'none',
                color: theme.palette.text.primary,
            },
        },
        featured: {
            color: '#FFD300',
            paddingTop: '2px',
        },
        verified: {
            fontSize: 29,
            color: theme.palette.secondary.main,
        },
        button: {
            textTransform: 'none',
            lineHeight: '1.5',
        },
        buttonDisabled: {
            color: `${theme.palette.text.primary} !important`,
            fontWeight: 'normal',
        },
        buttonLink: {
            color: theme.palette.primary.main,
            '& svg': {
                fill: theme.palette.text.primary,
            },
        },
        fabs: {
            textAlign: 'center',
        },
        fab: {},
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

const OrganizationCard = ({ organization, variant }: Props): ReactElement => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const onDialogClose = (): void => {
        setDialogOpen(false);
    };

    const onLinkClick = (label: string, gaEventAction = '') => (): void => {
        const dimension7 = organization.categories.map(({ name }) => name).join(', ');

        ReactGA.event({
            category: 'Helpline Card Engagement',
            action: gaEventAction,
            label: label,
            dimension6: organization.name,
            dimension7: dimension7,
        });

        setDialogOpen(true);
        outboundLink({ label }, noop);
    };

    return (
        <>
            <ReviewDialog organization={organization} open={dialogOpen} onClose={onDialogClose} />
            <Box data-testid={organization.slug} className={classes.box}>
                <Box className={classes.grid}>
                    <Box className={classes.header}>
                        <Typography variant="h6" className={classes.heading}>
                            {variant === 'widget' && (
                                <a data-testid="headingLink">
                                    <TextTruncate line={2} text={organization.name} />
                                </a>
                            )}
                            {!variant && (
                                <Link
                                    href="/organizations/[slug]"
                                    as={`/organizations/${organization.slug}`}
                                    passHref
                                    prefetch={process.env.NODE_ENV === 'production'}
                                >
                                    <a data-testid="headingLink">
                                        <TextTruncate line={2} text={organization.name} />
                                    </a>
                                </Link>
                            )}
                        </Typography>
                        {organization.featured && !organization.verified && (
                            <Box className={classes.featured} data-testid="featured">
                                <Tooltip title="Featured by Find A Helpline" placement="left" arrow enterTouchDelay={0}>
                                    <WhatshotIcon />
                                </Tooltip>
                            </Box>
                        )}
                        {organization.verified && (
                            <Box className={classes.verified} data-testid="verified">
                                <Tooltip title="Verified by Find A Helpline" placement="left" arrow enterTouchDelay={0}>
                                    <SvgIcon fontSize="inherit">
                                        <VerifyIcon />
                                    </SvgIcon>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>
                    {organization.categories.length > 0 && (
                        <Box ml={1} data-testid="categories">
                            <Chips items={organization.categories} max={3} />
                        </Box>
                    )}
                    {variant !== 'widget' && (
                        <Box ml={1}>
                            <OrganizationRating organization={organization} variant={variant} />
                        </Box>
                    )}
                    {(organization.alwaysOpen || organization.openingHours.length > 0) && (
                        <Box data-testid="open">
                            <NoSsr>
                                <OrganizationOpen organization={organization} />
                            </NoSsr>
                        </Box>
                    )}
                    {organization.humanSupportTypes.length > 0 && (
                        <Box>
                            <Button
                                size="large"
                                classes={{ root: classes.button, disabled: classes.buttonDisabled }}
                                startIcon={<AccountCircleIcon />}
                                disabled
                                data-testid="humanSupportTypes"
                            >
                                {organization.humanSupportTypes
                                    .map((humanSupportType) => humanSupportType.name)
                                    .join(', ')}
                            </Button>
                        </Box>
                    )}
                    {(organization.smsNumber || organization.phoneNumber) && (
                        <Box>
                            {organization.smsNumber && (
                                <Button
                                    size="large"
                                    className={[classes.button, classes.buttonLink].join(' ')}
                                    startIcon={
                                        <SvgIcon>
                                            <TextIcon />
                                        </SvgIcon>
                                    }
                                    data-testid="smsNumber"
                                    onClick={onLinkClick(`sms:${organization.smsNumber}`, 'SMS Number')}
                                    href={`sms:${organization.smsNumber}`}
                                    target="_parent"
                                    rel="noopener noreferrer"
                                >
                                    {organization.smsNumber}
                                </Button>
                            )}
                            {organization.phoneNumber && (
                                <Button
                                    size="large"
                                    className={[classes.button, classes.buttonLink].join(' ')}
                                    startIcon={
                                        <SvgIcon>
                                            <CallIcon />
                                        </SvgIcon>
                                    }
                                    data-testid="phoneNumber"
                                    onClick={onLinkClick(`tel:${organization.phoneNumber}`, 'Phone Number')}
                                    href={`tel:${organization.phoneNumber}`}
                                    target="_parent"
                                    rel="noopener noreferrer"
                                >
                                    {organization.phoneNumber}
                                </Button>
                            )}
                        </Box>
                    )}
                    {organization.url && (
                        <Box>
                            <Button
                                size="large"
                                className={[classes.button, classes.buttonLink].join(' ')}
                                startIcon={<LanguageIcon />}
                                data-testid="url"
                                onClick={onLinkClick(organization.url, 'Website URL')}
                                href={organization.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {
                                    organization.url
                                        .replace('http://', '')
                                        .replace('https://', '')
                                        .replace('www.', '')
                                        .split(/[/?#]/)[0]
                                }
                            </Button>
                        </Box>
                    )}
                </Box>
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
                                        className={classes.fab}
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
                                        className={classes.fab}
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
                                        className={classes.fab}
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
            </Box>
        </>
    );
};

export default OrganizationCard;
