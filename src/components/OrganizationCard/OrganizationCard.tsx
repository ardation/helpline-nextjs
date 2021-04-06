import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Typography, Box, Tooltip, SvgIcon } from '@material-ui/core';
import Link from 'next/link';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TextTruncate from 'react-text-truncate';
import ReviewDialog from '../ReviewDialog';
import VerifyIcon from '../../assets/verify-icon.svg';
import OrganizationFab from '../OrganizationFab';
import OrganizationContent from '../OrganizationContent';

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

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
            borderRadius: '10px',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            height: '100%',
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
    }),
);

const OrganizationCard = ({ organization, variant }: Props): ReactElement => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const onDialogClose = (): void => {
        setDialogOpen(false);
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
                    <OrganizationContent
                        organization={organization}
                        variant={variant}
                        onLink={(): void => setDialogOpen(true)}
                    />
                </Box>
                <OrganizationFab organization={organization} onLink={(): void => setDialogOpen(true)} />
            </Box>
        </>
    );
};

export default OrganizationCard;
