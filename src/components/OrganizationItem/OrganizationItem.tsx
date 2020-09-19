import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Chip, Button, Box, Container, NoSsr } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import PublicIcon from '@material-ui/icons/Public';
import CreateIcon from '@material-ui/icons/Create';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { OutboundLink } from 'react-ga';
import OrganizationOpen from '../OrganizationOpen';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import ReviewDialog from '../ReviewDialog';
import OrganizationRating from '../OrganizationRating';
import Reviews from '../Reviews';

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

type Subdivision = {
    name: string;
};

type Country = {
    name: string;
};

type Review = {
    rating: number;
    content?: string;
    createdAt: string;
};

export type Organization = {
    id: string;
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
    subdivisions: Subdivision[];
    country: Country;
    rating: number;
    reviewCount: number;
    reviews: Review[];
    notes?: string;
    featured: boolean;
    verified: boolean;
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
            color: theme.palette.secondary.main,
            fontSize: '0.9rem',
        },
        featured: {
            marginLeft: '5px',
            marginBottom: '-2px',
            color: '#FFD300',
        },
        verified: {
            marginLeft: '5px',
            marginBottom: '-2px',
        },
    }),
);

const OrganizationItem = ({ organization }: Props): ReactElement => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const onDialogClose = (): void => {
        setDialogOpen(false);
    };

    const onLinkClick = (): void => {
        setDialogOpen(true);
    };

    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Container className={classes.container} maxWidth="sm">
                <Box className={classes.grid}>
                    <Box ml={1} mb={1}>
                        <Typography variant="h6" className={classes.heading}>
                            {organization.name}
                            {organization.featured && !organization.verified && (
                                <WhatshotIcon className={classes.featured} data-testid="featured" />
                            )}
                            {organization.verified && (
                                <VerifiedUserIcon className={classes.verified} data-testid="verified" />
                            )}
                        </Typography>
                        <Typography className={classes.country}>
                            {organization.subdivisions.length > 0 && (
                                <>{organization.subdivisions.map(({ name }) => name).join(', ')},</>
                            )}{' '}
                            {organization.country.name}
                        </Typography>
                    </Box>
                    <Box ml={1}>
                        <OrganizationRating organization={organization} variant="item" />
                    </Box>
                    <Box ml={1} my={1}>
                        <ReviewDialog
                            organization={organization}
                            open={dialogOpen}
                            onClose={onDialogClose}
                            button={true}
                        />
                    </Box>
                    {(organization.alwaysOpen || organization.openingHours.length > 0) && (
                        <Box data-testid="open">
                            <NoSsr>
                                <OrganizationOpen organization={organization} expandable={true} />
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
                                    onClick={onLinkClick}
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
                    {(organization.smsNumber || organization.phoneNumber || organization.chatUrl) && (
                        <Box ml={1}>
                            {organization.smsNumber && (
                                <OutboundLink
                                    eventLabel={`sms:${organization.smsNumber}`}
                                    to={`sms:${organization.smsNumber}`}
                                    target="_parent"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        className={[classes.button, classes.buttonHighlight].join(' ')}
                                        startIcon={<SmsOutlinedIcon />}
                                        data-testid="smsNumber"
                                        onClick={onLinkClick}
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
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        className={[classes.button, classes.buttonHighlight].join(' ')}
                                        startIcon={<PhoneIcon />}
                                        data-testid="phoneNumber"
                                        onClick={onLinkClick}
                                    >
                                        {organization.phoneNumber}
                                    </Button>
                                </OutboundLink>
                            )}
                            {organization.chatUrl && (
                                <OutboundLink
                                    eventLabel={organization.chatUrl}
                                    to={organization.chatUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        className={[classes.button, classes.buttonHighlight].join(' ')}
                                        startIcon={<MessageOutlinedIcon />}
                                        data-testid="chatUrl"
                                        onClick={onLinkClick}
                                    >
                                        {
                                            organization.chatUrl
                                                .replace('http://', '')
                                                .replace('https://', '')
                                                .replace('www.', '')
                                                .split(/[/?#]/)[0]
                                        }
                                    </Button>
                                </OutboundLink>
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
                    {organization.notes && (
                        <Box ml={1} mb={1} mt={2}>
                            <Typography className={classes.heading}>Accessibility Notes</Typography>
                            <Typography>{organization.notes}</Typography>
                        </Box>
                    )}
                    <Box my={1} ml={1}>
                        <Button
                            size="small"
                            className={[classes.button, classes.buttonLink].join(' ')}
                            startIcon={<CreateIcon />}
                            href={`https://livefortomorrow.typeform.com/to/oc0aZHWI?remote_id=${organization.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Suggest an edit
                        </Button>
                    </Box>
                </Box>
            </Container>
            {organization.reviews.length > 0 && <Reviews reviews={organization.reviews} />}
        </>
    );
};

export default OrganizationItem;
