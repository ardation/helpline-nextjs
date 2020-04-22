import React, { ReactElement, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Theme } from '@material-ui/core';
import OrganizationContext from '../../context/organizationContext';
import TopBar from '../TopBar';
import SearchHeader from '../SearchHeader';

type Props = {};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        header: {
            position: 'relative',
            marginBottom: theme.spacing(2),
        },
        organizations: {
            maxHeight: '100vh',
            borderRadius: '0 0 10px 10px',
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
                <Container className={classes.organizations}>
                    {organizations.map((item) => (
                        <strong key={item.name}>{item.name} - </strong>
                    ))}
                </Container>
            </Box>
        </Container>
    );
};

export default Widget;
