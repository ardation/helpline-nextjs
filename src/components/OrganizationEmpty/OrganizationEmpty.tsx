import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Container, Link } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import NextLink from 'next/link';
import { Organization } from '../OrganizationCard/OrganizationCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'grid',
            border: '1px solid #000',
            borderRadius: '10px',
            gridGap: theme.spacing(2),
            textAlign: 'left',
            padding: theme.spacing(2),
            height: 'calc(100% - 2px)',
        },
        icon: {
            justifySelf: 'center',
        },
        link: {
            color: '#000',
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
            <InfoOutlinedIcon className={classes.icon} fontSize="large" />
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
                            fontSize="large"
                            data-testid="OrganizationEmptyWidget"
                        />
                    ) : (
                        <ArrowDownwardIcon
                            className={classes.icon}
                            fontSize="large"
                            data-testid="OrganizationEmptyDefault"
                        />
                    )}
                </>
            ) : (
                <Typography data-testid="OrganizationEmptyNoAlternatives">
                    Try{' '}
                    <NextLink href="/" passHref>
                        <Link className={classes.link}>searching again</Link>
                    </NextLink>{' '}
                    with fewer criteria or for nationwide helplines.
                </Typography>
            )}
        </Container>
    );
};

export default OrganizationEmpty;
