import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Typography, Container, Link } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import NextLink from 'next/link';
import { Organization } from '../OrganizationCard/OrganizationCard';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'grid',
            borderRadius: '10px',
            gridGap: theme.spacing(2),
            textAlign: 'left',
            padding: theme.spacing(2),
            height: 'calc(100% - 2px)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            backgroundColor: theme.palette.background.paper,
        },
        icon: {
            justifySelf: 'center',
        },
        link: {
            color: theme.palette.text.primary,
            textDecoration: 'underline',
        },
    }),
);

interface Props {
    variant?: 'widget';
    organizations: Organization[];
}

const OrganizationEmpty = ({ variant, organizations }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs" className={classes.container}>
            <InfoIcon className={classes.icon} color="secondary" />
            <Typography>
                We&apos;ve searched high and low and can&apos;t find a specialist helpline matching your search
                criteria.
            </Typography>
            {organizations.length > 0 ? (
                <>
                    <Typography>However, we found these helplines that can support you 24/7.</Typography>
                    {variant === 'widget' ? (
                        <ArrowForwardIcon
                            className={classes.icon}
                            data-testid="OrganizationEmptyWidget"
                            color="secondary"
                        />
                    ) : (
                        <ArrowDownwardIcon
                            className={classes.icon}
                            data-testid="OrganizationEmptyDefault"
                            color="secondary"
                        />
                    )}
                </>
            ) : (
                <Typography data-testid="OrganizationEmptyNoAlternatives">
                    Try{' '}
                    <NextLink href="/" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link}>searching again</Link>
                    </NextLink>{' '}
                    with fewer criteria or for nationwide helplines.
                </Typography>
            )}
        </Container>
    );
};

export default OrganizationEmpty;
