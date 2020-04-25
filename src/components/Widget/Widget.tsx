import React, { ReactElement, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Theme, Typography, Button } from '@material-ui/core';
import NextLink from 'next/link';
import CodeIcon from '@material-ui/icons/Code';
import OrganizationContext from '../../context/organizationContext';
import TopBar from '../TopBar';
import WidgetSearch from '../WidgetSearch';
import WidgetOrganizationList from '../WidgetOrganizationList';

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

const Widget = (): ReactElement => {
    const classes = useStyles();
    const { countries, activeCountry, organizations } = useContext(OrganizationContext);

    return (
        <Container className={classes.container}>
            <Box maxWidth="md">
                <div className={classes.header}>
                    <WidgetSearch countries={countries} parentPage="widget" />
                    <TopBar widget country={{ emergencyNumber: activeCountry?.emergencyNumber }} />
                </div>
                {!activeCountry && organizations.length > 0 && (
                    <Container className={classes.noResults}>
                        <Typography>Sorry, no results found</Typography>
                    </Container>
                )}
                <Container className={classes.carousel}>
                    <WidgetOrganizationList organizations={organizations} />
                </Container>
            </Box>
            <NextLink href="/embed" passHref>
                <Button
                    startIcon={<CodeIcon />}
                    color="primary"
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Embed Find A Helpline on your website
                </Button>
            </NextLink>
        </Container>
    );
};

export default Widget;
