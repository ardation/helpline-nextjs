import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
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

type Country = {
    emergencyNumber: string;
};

type Props = {
    country?: Country;
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
    }),
);

const Widget = ({ country }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <Container className={classes.topbar}>
                <Box maxWidth="md">
                    <div className={classes.topbar}>
                        <TopBar country={{ emergencyNumber: '111' }} />
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
