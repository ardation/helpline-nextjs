import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Button } from '@material-ui/core';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import TopBar from '../TopBar/TopBar';

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
    countries: Country[];
    topics: Topic[];
    xprops?: any;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            flex: '0 0 auto',
            border: '1px solid #000',
            borderRadius: '10px',
            overflow: 'scroll',
        },
        topbar: {
            maxHeight: '20%',
        },
        container: {
            borderRadius: '10px',
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
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const classes = useStyles();

    return (
        <>
            <Container className={classes.topbar}>
                <Box maxWidth="md">
                    <div className={classes.topbar}>
                        <TopBar country={{ emergencyNumber: '111' }} />
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
                    </div>
                    <Box className={classes.box}>
                        <Box className={classes.carousel} m={2}>
                            <OrganizationCard organization={organization} />
                            <OrganizationCard organization={organization} />
                            <OrganizationCard organization={organization} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Widget;
