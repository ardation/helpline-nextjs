import React, { ReactElement, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Theme, Typography } from '@material-ui/core';
import OrganizationContext from '../../context/organizationContext';
import TopBar from '../TopBar';
import SearchHeader from '../SearchHeader';
import OrganizationCarousel from '../OrganizationCarousel/OrganizationCarousel';
import EmbedLink from '../EmbedLink';

type Props = {};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            border: '1px solid #000',
            borderRadius: '0 0 10px 10px',
            overflowY: 'scroll',
        },
        header: {
            position: 'relative',
            marginBottom: theme.spacing(2),
        },
        organizations: {
            maxHeight: '100vh',
            borderRadius: '0 0 10px 10px',
        },
        carousel: {
            display: 'flex',
            flex: '0 0 auto',
            alignItems: 'flex-start',
            flexDirection: 'column',
            '@media (min-width: 400px)': {
                overflow: 'scroll',
                flexDirection: 'row',
            },
            minWidth: 0,
            padding: theme.spacing(1),
        },
        noResults: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(10),
        },
    }),
);

const Widget = ({}: Props): ReactElement => {
    const classes = useStyles();
    const { countries, activeCountry, organizations } = useContext(OrganizationContext);

    return (
        <Container className={classes.container}>
            <Box maxWidth="md">
                <div className={classes.header}>
                    <SearchHeader countries={countries} parentPage="widget" />
                    <TopBar widget country={{ emergencyNumber: activeCountry?.emergencyNumber }} />
                </div>
                {!activeCountry && organizations.length > 0 && (
                    <Container className={classes.noResults}>
                        <Typography>Sorry, no results found</Typography>
                    </Container>
                )}
                <Container className={classes.carousel}>
                    <OrganizationCarousel widget organizations={organizations} />
                </Container>
            </Box>
            <EmbedLink />
        </Container>
    );
};

export default Widget;
