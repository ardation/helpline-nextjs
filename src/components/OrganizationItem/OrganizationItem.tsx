import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Chip, Button, Box, Container } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import PublicIcon from '@material-ui/icons/Public';
import CreateIcon from '@material-ui/icons/Create';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import OrganizationOpen from '../OrganizationOpen';
import NavBar from '../NavBar';
import SideBar from '../SideBar';

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

type Country = {
    name: string;
};

export type Organization = {
    slug: string;
    name: string;
    alwaysOpen: boolean;
    humanSupportTypes: HumanSupportType[];
    categories: Category[];
    openingHours: OpeningHour[];
    smsNumber?: string;
    phoneNumber?: string;
    url?: string;
    chatUrl?: string;
    timezone: string;
    country: Country;
};

type Props = {
    organization: Organization;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        grid: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
        },
        heading: {
            fontWeight: 'bold',
            color: theme.palette.text.primary,
        },
        chipAlwaysOpen: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            backgroundColor: theme.palette.secondary.main,
            textDecoration: 'none',
            marginLeft: theme.spacing(2),
        },
        button: {
            textTransform: 'none',
            lineHeight: '1.5',
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
        buttonHighlight: {
            borderRadius: '1000px',
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
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
        },
        chip: {
            color: '#FFFFFF',
            backgroundColor: theme.palette.text.primary,
            fontWeight: 600,
        },
        country: {
            marginLeft: theme.spacing(2),
            color: theme.palette.secondary.main,
            fontSize: '0.9rem',
        },
    }),
);

const OrganizationItem = ({ organization }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Container className={classes.container} maxWidth="sm">
                <Box className={classes.grid}>
                    <Box ml={1}>
                        <Typography variant="h6">
                            <a className={classes.heading}>{organization.name}</a>
                            {organization.alwaysOpen && <Chip className={classes.chipAlwaysOpen} label="24/7" />}
                            <span className={classes.country}>{organization.country.name}</span>
                        </Typography>
                    </Box>
                    {(organization.alwaysOpen || organization.openingHours.length > 0) && (
                        <Box data-testid="open">
                            <Button
                                size="large"
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
                    {organization.url && (
                        <Box>
                            <Button
                                size="large"
                                href={organization.url}
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
                    {(organization.smsNumber || organization.phoneNumber || organization.chatUrl) && (
                        <Box ml={1}>
                            {organization.smsNumber && (
                                <Button
                                    variant="contained"
                                    href={`sms:${organization.smsNumber}`}
                                    size="large"
                                    color="primary"
                                    className={[classes.button, classes.buttonHighlight].join(' ')}
                                    startIcon={<SmsOutlinedIcon />}
                                    data-testid="smsNumber"
                                >
                                    {organization.smsNumber}
                                </Button>
                            )}
                            {organization.phoneNumber && (
                                <Button
                                    variant="contained"
                                    href={`tel:${organization.phoneNumber}`}
                                    size="large"
                                    color="primary"
                                    className={[classes.button, classes.buttonHighlight].join(' ')}
                                    startIcon={<PhoneIcon />}
                                    data-testid="phoneNumber"
                                >
                                    {organization.phoneNumber}
                                </Button>
                            )}
                            {organization.chatUrl && (
                                <Button
                                    variant="contained"
                                    href={organization.chatUrl}
                                    size="large"
                                    color="primary"
                                    className={[classes.button, classes.buttonHighlight].join(' ')}
                                    startIcon={<MessageOutlinedIcon />}
                                    data-testid="chatUrl"
                                >
                                    {
                                        organization.chatUrl
                                            .replace('http://', '')
                                            .replace('https://', '')
                                            .replace('www.', '')
                                            .split(/[/?#]/)[0]
                                    }
                                </Button>
                            )}
                        </Box>
                    )}
                    {organization.categories.length > 0 && (
                        <Box ml={1} className={classes.chips} data-testid="categories">
                            {organization.categories.map((category, index) => (
                                <Chip className={classes.chip} key={index} label={category.name} />
                            ))}
                        </Box>
                    )}
                    <Box my={1} ml={1}>
                        <Button
                            size="small"
                            className={[classes.button, classes.buttonLink].join(' ')}
                            startIcon={<CreateIcon />}
                            href={`https://zealnz.typeform.com/to/mMLYXV?remote_id=${organization.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Suggest an edit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default OrganizationItem;
