import React, { ReactElement, useState } from 'react';
import {
    createStyles,
    makeStyles,
    Typography,
    Button,
    Box,
    Container,
    Tooltip,
    Paper,
    SvgIcon,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ReviewDialog from '../ReviewDialog';
import Reviews from '../Reviews';
import OrganizationContent from '../OrganizationContent';
import OrganizationFab from '../OrganizationFab';
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

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2, 0),
        },
        grid: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
        },
        heading: {
            fontWeight: 600,
            fontFamily: theme.typography.fontFamily,
        },
        button: {
            textTransform: 'none',
            lineHeight: '1.5',
        },
        buttonLink: {
            textDecoration: 'underline',
            color: theme.palette.text.secondary,
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        verified: {
            marginLeft: '10px',
            marginBottom: '-5px',
            fontSize: 24,
        },
        notes: {
            color: theme.palette.text.secondary,
        },
    }),
);

const OrganizationItem = ({ organization }: Props): ReactElement => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const onDialogClose = (): void => {
        setDialogOpen(false);
    };

    return (
        <Paper elevation={0} className={classes.paper}>
            <Container maxWidth="sm">
                <Box className={classes.grid}>
                    <Box ml={1} mb={1}>
                        <Typography variant="h6" component="h1" className={classes.heading}>
                            {organization.name}
                            {organization.verified && (
                                <Tooltip title="Verified by Find A Helpline" placement="left" arrow enterTouchDelay={0}>
                                    <SvgIcon
                                        fontSize="inherit"
                                        color="secondary"
                                        className={classes.verified}
                                        data-testid="verified"
                                    >
                                        <VerifyIcon />
                                    </SvgIcon>
                                </Tooltip>
                            )}
                        </Typography>
                        <Typography>
                            {organization.subdivisions.length > 0 && (
                                <>{organization.subdivisions.map(({ name }) => name).join(', ')},</>
                            )}{' '}
                            {organization.country.name}
                        </Typography>
                    </Box>
                    <OrganizationContent
                        organization={organization}
                        onLink={(): void => setDialogOpen(true)}
                        expandable
                    />
                    {organization.notes && (
                        <Box ml={1} mb={1} mt={2}>
                            <Typography className={classes.heading}>Accessibility notes</Typography>
                            <Typography className={classes.notes}>{organization.notes}</Typography>
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
                    <Box ml={1} my={1}>
                        <ReviewDialog
                            organization={organization}
                            open={dialogOpen}
                            onClose={onDialogClose}
                            button={true}
                        />
                    </Box>
                    <Box ml={1} my={1}>
                        <OrganizationFab organization={organization} onLink={(): void => setDialogOpen(true)} />
                    </Box>
                </Box>
            </Container>
            {organization.reviews.length > 0 && <Reviews reviews={organization.reviews} />}
        </Paper>
    );
};

export default OrganizationItem;
