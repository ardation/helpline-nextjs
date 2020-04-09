import React, { ReactElement } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Button } from '@material-ui/core';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import WidgetSearch from '../WidgetSearch';

const organization = {
    slug: 'youthline',
    name: 'Youthline',
    alwaysOpen: true,
    openingHours: [],
    humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
    categories: [{ name: 'For youth' }, { name: 'All issues' }],
    smsNumber: '234',
    phoneNumber: '0800 376 633',
    url: 'https://www.youthline.co.nz/learn-and-grow.html',
    chatUrl: 'https://youthline.co.nz',
    timezone: 'Auckland',
};

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
};

type Topic = {
    name: string;
};

type Props = {
    country?: Country;
    countries: Country[];
    topics: Topic[];
    xprops?: any;
};

const useStyles = makeStyles(() =>
    createStyles({
        div100vh: {
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
        },
        box: {
            display: 'flex',
            flex: '0 0 auto',
            border: '1px solid #000',
            borderRadius: '0 0 10px 10px',
            overflow: 'auto',
        },
        container: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        carousel: {
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'flex-start',
            touchAction: 'manipulation',
            overflow: 'scroll',
            flexDirection: 'column',
            '@media (min-width: 480px)': {
                flexDirection: 'row',
            },
            minWidth: 0,
        },
        button: {
            borderRadius: '1000px',
        },
    }),
);

const Widget = ({ topics, countries, xprops }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box maxWidth="md">
                <WidgetSearch countries={countries} />
                {xprops ? (
                    <Button
                        data-testid="searchButton"
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={(): void => xprops.onCallback('Hello from the next.js app!')}
                    >
                        {xprops.text}
                    </Button>
                ) : null}
                <Box className={classes.box}>
                    <Box className={classes.carousel} m={2}>
                        <OrganizationCard organization={organization} />
                        <OrganizationCard organization={organization} />
                        <OrganizationCard organization={organization} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Widget;
