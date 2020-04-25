import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Chip, Button, Box, Fab, Tooltip } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import PublicIcon from '@material-ui/icons/Public';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import Link from 'next/link';
import OrganizationOpen from '../OrganizationOpen';

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
};

type Props = {
    organization: Organization;
    widget?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            border: '1px solid #000',
            borderRadius: '10px',
            gridTemplateColumns: '1fr 88px',
            width: '60vw',
            maxWidth: '20rem',
            // height: '50vh',
            minHeight: '20rem',
            flex: 1,
            '& > div': {
                padding: theme.spacing(2),
            },
            [theme.breakpoints.down(420)]: {
                flexDirection: 'column',
            },
        },
        webChatSpacing: {
            display: 'none',
            '@media (max-width: 320px)': {
                display: 'inline',
            },
        },
        webChatLineBreak: {
            '@media (max-width: 320px)': {
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
        },
        heading: {
            fontWeight: 'bold',
            textDecoration: (props: Props): string => !props.widget && 'underline',
            color: theme.palette.text.primary,
            marginRight: theme.spacing(1),
            [theme.breakpoints.down(420)]: {
                fontSize: '16px',
            },
        },
        truncate: {
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': 2,
            overflow: 'hidden',
        },
        chipAlwaysOpen: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            backgroundColor: theme.palette.secondary.main,
            textDecoration: 'none',
            [theme.breakpoints.down(420)]: {
                fontSize: '10px',
                height: '24px',
            },
        },
        button: {
            textTransform: 'none',
            lineHeight: '1.5',
            [theme.breakpoints.down(420)]: {
                textAlign: 'left',
                fontSize: '12px',
            },
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
        chips: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            marginTop: theme.spacing(1),
            '& > *': {
                marginRight: theme.spacing(0.5),
                marginBottom: theme.spacing(0.5),
            },
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'row',
            },
        },
        chip: {
            color: '#FFFFFF',
            backgroundColor: theme.palette.text.primary,
            fontWeight: 600,
            [theme.breakpoints.down(420)]: {
                fontSize: '10px',
                height: '24px',
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
                gridRowGap: theme.spacing(1),
            },
            [theme.breakpoints.down(420)]: {
                borderTopRightRadius: '0',
                borderBottomLeftRadius: '10px',
                gridAutoFlow: 'column',
                gridTemplateColumns: '1fr 1fr 1fr',
            },
        },
        fab: {
            fontSize: '2rem',
            '&.MuiFab-sizeMedium': {
                fontSize: '1.5rem',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '1rem',
                    height: '40px',
                    width: '40px',
                },
            },
        },
        fabLabel: {
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            lineHeight: '1rem',
            paddingTop: theme.spacing(1),
            [theme.breakpoints.down('xs')]: {
                fontSize: '10px',
            },
        },
    }),
);

const OrganizationCard = ({ organization, widget }: Props): ReactElement => {
    const classes = useStyles({ widget });

    return (
        <Box className={classes.box}>
            <Box className={classes.grid}>
                <Box ml={1}>
                    <Typography variant="h6" className={classes.header}>
                        {widget ? (
                            <Tooltip className={classes.truncate} title={organization.name} arrow placement="top">
                                <strong className={classes.heading}>{organization.name}</strong>
                            </Tooltip>
                        ) : (
                            <Link href="/organizations/[slug]" as={`/organizations/${organization.slug}`} passHref>
                                <a className={classes.heading}>{organization.name}</a>
                            </Link>
                        )}
                        {organization.alwaysOpen && <Chip className={classes.chipAlwaysOpen} label="24/7" />}
                    </Typography>
                </Box>
                {(organization.alwaysOpen || organization.openingHours.length > 0) && (
                    <Box data-testid="open">
                        <Button
                            size={widget ? 'small' : 'large'}
                            classes={{ root: classes.button, disabled: classes.buttonDisabled }}
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
                            size={widget ? 'small' : 'large'}
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
                            <Button
                                href={`sms:${organization.smsNumber}`}
                                size={widget ? 'small' : 'large'}
                                className={[classes.button, classes.buttonLink].join(' ')}
                                startIcon={<SmsOutlinedIcon />}
                                data-testid="smsNumber"
                            >
                                {organization.smsNumber}
                            </Button>
                        )}
                        {organization.phoneNumber && (
                            <Button
                                href={`tel:${organization.phoneNumber}`}
                                size={widget ? 'small' : 'large'}
                                className={[classes.button, classes.buttonLink].join(' ')}
                                startIcon={<PhoneIcon />}
                                data-testid="phoneNumber"
                            >
                                {organization.phoneNumber}
                            </Button>
                        )}
                    </Box>
                )}
                {organization.url && (
                    <Box>
                        <Button
                            size={widget ? 'small' : 'large'}
                            href={organization.url}
                            target={widget && '_blank'}
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
                    </Box>
                )}
                {organization.categories.length > 0 && (
                    <Box ml={1} className={classes.chips} data-testid="categories">
                        {organization.categories.map(
                            (category, index) =>
                                index < 4 && <Chip className={classes.chip} key={index} label={category.name} />,
                        )}
                    </Box>
                )}
            </Box>
            {(organization.smsNumber || organization.phoneNumber || organization.chatUrl) && (
                <Box className={classes.side} data-testid="fabs">
                    {organization.smsNumber && (
                        <Box>
                            <Fab
                                href={`sms:${organization.smsNumber}`}
                                color="primary"
                                aria-label="text"
                                data-testid="smsNumberFab"
                                size={widget ? 'medium' : 'large'}
                                className={classes.fab}
                            >
                                <SmsOutlinedIcon fontSize="inherit" />
                            </Fab>
                            <Typography className={classes.fabLabel}>Text</Typography>
                        </Box>
                    )}
                    {organization.phoneNumber && (
                        <Box>
                            <Fab
                                href={`tel:${organization.phoneNumber}`}
                                color="primary"
                                aria-label="call"
                                data-testid="phoneNumberFab"
                                size={widget ? 'medium' : 'large'}
                                className={classes.fab}
                            >
                                <PhoneIcon fontSize="inherit" />
                            </Fab>
                            <Typography className={classes.fabLabel}>Call</Typography>
                        </Box>
                    )}
                    {organization.chatUrl && (
                        <Box>
                            <Fab
                                href={organization.chatUrl}
                                color="primary"
                                aria-label="text"
                                data-testid="chatUrlFab"
                                size={widget ? 'medium' : 'large'}
                                className={classes.fab}
                            >
                                <MessageOutlinedIcon fontSize="inherit" />
                            </Fab>
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
