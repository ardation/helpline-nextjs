import React, { ReactElement, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Theme } from '@material-ui/core';
import OrganizationContext from '../../context/organizationContext';
import TopBar from '../TopBar';
import SearchHeader from '../SearchHeader';
import WidgetCarousel from '../OrganizationCarousel';

type Props = {};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
            maxHeight: '100vh',
            overflow: 'scroll',
            paddingLeft: 0,
            paddingRight: 0,
            border: '1px solid #000',
            borderRadius: '0 0 10px 10px',
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
            '@media (min-width: 480px)': {
                overflow: 'scroll',
                flexDirection: 'row',
            },
            minWidth: 0,
            padding: theme.spacing(1),
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
                <Container className={classes.carousel}>
                    <WidgetCarousel organizations={organizations} />
                </Container>
            </Box>
        </Container>
    );
};

export default Widget;
