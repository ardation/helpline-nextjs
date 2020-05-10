import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Box, Fab } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import PublicIcon from '@material-ui/icons/Public';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import Link from 'next/link';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TextTruncate from 'react-text-truncate';
import { OutboundLink } from 'react-ga';
import OrganizationOpen from '../OrganizationOpen';
import Chips from '../Chips';
import OrganizationRating from '../OrganizationRating';

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
            display: 'flex',
            border: '1px solid #000',
            borderRadius: '10px',
            gridTemplateColumns: '1fr 88px',
            height: 'calc(100% - 2px)',
            '& > div': {
                padding: theme.spacing(2),
            },
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
            },
        },
        webChatSpacing: {
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'inline',
            },
        },
        webChatLineBreak: {
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
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
                fontWeight: 'bold',
                textDecoration: 'underline',
                color: theme.palette.text.primary,
            },
        },
        featured: {
            color: '#FFD300',
            paddingTop: '2px',
        },
        button: {
            textTransform: 'none',
            lineHeight: '1.5',
        },
        buttonOpen: {
            textAlign: 'left',
            alignItems: 'flex-start',
        },
        buttonDisabled: {
            color: `${theme.palette.text.primary} !important`,
        },
        buttonLink: {
            textDecoration: 'underline',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        side: {
            display: 'grid',
            backgroundColor: '#F0F1F5',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            textAlign: 'center',
            gridRowGap: theme.spacing(2),
            gridAutoRows: 'min-content',
            [theme.breakpoints.down('xs')]: {
                borderTopRightRadius: '0',
                borderBottomLeftRadius: '10px',
                gridAutoFlow: 'column',
            },
        },
        fab: {
            fontSize: '2rem',
        },
        fabLabel: {
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            lineHeight: '1rem',
            paddingTop: theme.spacing(1),
        },
    }),
);

const OrganizationCard = ({ organization, variant }: Props): ReactElement => {
    const classes = useStyles();

    return (
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
                            <Link href="/organizations/[slug]" as={`/organizations/${organization.slug}`} passHref>
                                <a data-testid="headingLink">
                                    <TextTruncate line={2} text={organization.name} />
                                </a>
                            </Link>
                        )}
                    </Typography>
                    {organization.featured && (
                        <Box className={classes.featured}>
                            <WhatshotIcon />
                        </Box>
                    )}
                </Box>
                <Box ml={1}>
                    <OrganizationRating organization={organization} variant={variant} />
                </Box>
                {(organization.alwaysOpen || organization.openingHours.length > 0) && (
                    <Box data-testid="open">
                        <Button
                            size="large"
                            classes={{
                                root: [classes.button, classes.buttonOpen].join(' '),
                                disabled: classes.buttonDisabled,
                            }}
                            startIcon={<AccessTimeIcon />}
                            disabled
                        >
                            <OrganizationOpen organization={organization} />
                        </Button>
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
                            {organization.humanSupportTypes.map((humanSupportType) => humanSupportType.name).join(', ')}
                        </Button>
                    </Box>
                )}
                {(organization.smsNumber || organization.phoneNumber) && (
                    <Box>
                        {organization.smsNumber && (
                            <OutboundLink
                                eventLabel={`sms:${organization.smsNumber}`}
                                to={`sms:${organization.smsNumber}`}
                                target="_parent"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    size="large"
                                    className={[classes.button, classes.buttonLink].join(' ')}
                                    startIcon={<SmsOutlinedIcon />}
                                    data-testid="smsNumber"
                                >
                                    {organization.smsNumber}
                                </Button>
                            </OutboundLink>
                        )}
                        {organization.phoneNumber && (
                            <OutboundLink
                                eventLabel={`tel:${organization.phoneNumber}`}
                                to={`tel:${organization.phoneNumber}`}
                                target="_parent"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    size="large"
                                    className={[classes.button, classes.buttonLink].join(' ')}
                                    startIcon={<PhoneIcon />}
                                    data-testid="phoneNumber"
                                >
                                    {organization.phoneNumber}
                                </Button>
                            </OutboundLink>
                        )}
                    </Box>
                )}
                {organization.url && (
                    <Box>
                        <OutboundLink
                            eventLabel={organization.url}
                            to={organization.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="large"
                                className={[classes.button, classes.buttonLink].join(' ')}
                                startIcon={<PublicIcon />}
                                data-testid="url"
                            >
                                {
                                    organization.url
                                        .replace('http://', '')
                                        .replace('https://', '')
                                        .replace('www.', '')
                                        .split(/[/?#]/)[0]
                                }
                            </Button>
                        </OutboundLink>
                    </Box>
                )}
                {organization.categories.length > 0 && (
                    <Box ml={1} data-testid="categories">
                        <Chips items={organization.categories} max={3} />
                    </Box>
                )}
            </Box>
            {(organization.smsNumber || organization.phoneNumber || organization.chatUrl) && (
                <Box className={classes.side} data-testid="fabs">
                    {organization.smsNumber && (
                        <Box>
                            <OutboundLink
                                eventLabel={`sms:${organization.smsNumber}`}
                                to={`sms:${organization.smsNumber}`}
                                target="_parent"
                                rel="noopener noreferrer"
                            >
                                <Fab
                                    color="primary"
                                    aria-label="text"
                                    data-testid="smsNumberFab"
                                    className={classes.fab}
                                >
                                    <SmsOutlinedIcon fontSize="inherit" />
                                </Fab>
                            </OutboundLink>
                            <Typography className={classes.fabLabel}>Text</Typography>
                        </Box>
                    )}
                    {organization.phoneNumber && (
                        <Box>
                            <OutboundLink
                                eventLabel={`tel:${organization.phoneNumber}`}
                                to={`tel:${organization.phoneNumber}`}
                                target="_parent"
                                rel="noopener noreferrer"
                            >
                                <Fab
                                    color="primary"
                                    aria-label="call"
                                    data-testid="phoneNumberFab"
                                    className={classes.fab}
                                >
                                    <PhoneIcon fontSize="inherit" />
                                </Fab>
                            </OutboundLink>
                            <Typography className={classes.fabLabel}>Call</Typography>
                        </Box>
                    )}
                    {organization.chatUrl && (
                        <Box>
                            <OutboundLink
                                eventLabel={organization.chatUrl}
                                to={organization.chatUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Fab
                                    color="primary"
                                    aria-label="web chat"
                                    data-testid="chatUrlFab"
                                    className={classes.fab}
                                >
                                    <MessageOutlinedIcon fontSize="inherit" />
                                </Fab>
                            </OutboundLink>
                            <Typography className={classes.fabLabel}>
                                Web<span className={classes.webChatSpacing}>&nbsp;</span>
                                <br className={classes.webChatLineBreak} />
                                Chat
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default OrganizationCard;
