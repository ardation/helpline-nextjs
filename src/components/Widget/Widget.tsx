import React, { ReactElement, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Theme, Typography, Button } from '@material-ui/core';
import NextLink from 'next/link';
import CodeIcon from '@material-ui/icons/Code';
import TopBar from '../TopBar';
import WidgetSearch from '../WidgetSearch';
import WidgetOrganizationList from '../WidgetOrganizationList';
import OrganizationFilter from '../OrganizationFilter';
import NavBar from '../NavBar';

interface Subdivision {
    code: string;
    name: string;
}

interface Country {
    code: string;
    name: string;
    emergencyNumber: string;
    subdivisions: Subdivision[];
}

interface Tag {
    name: string;
}

interface Organization {
    name: string;
}

interface Props {
    countries: Country[];
    selectedCountry: Country;
    organizations: Organization[];
    topics: Tag[];
    categories: Tag[];
    humanSupportTypes: Tag[];
}

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

const Widget = ({
    countries,
    selectedCountry,
    organizations,
    topics,
    categories,
    humanSupportTypes,
}: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box maxWidth="md">
                <div className={classes.header}>
                    <NavBar variant="widget" />
                    <WidgetSearch countries={countries} />
                    <TopBar variant="widget" country={selectedCountry} />
                </div>
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
