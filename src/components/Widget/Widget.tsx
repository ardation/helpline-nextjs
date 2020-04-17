import React, { ReactElement, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
import OrganizationContext from '../../context/organizationContext';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import WidgetSearch from '../WidgetSearch';
import WidgetBar from '../WidgetBar';
import WidgetCarousel from '../WidgetCarousel';
import Spinner from '../Spinner';

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
};

type Props = {
    xprops?: any;
};

type CountrySearch = {
    country: Country;
    subdivision: Subdivision;
};

const useStyles = makeStyles(() =>
    createStyles({
        box: {
            display: 'flex',
            alignItems: 'flex-start',
            maxHeight: '100vh',
            border: '1px solid #000',
            borderRadius: '0 0 10px 10px',
            overflow: 'auto',
            '@media (max-width: 412px)': {
                flexDirection: 'column',
            },
        },
        container: {
            height: '100vh',
            paddingLeft: 0,
            paddingRight: 0,
        },
        header: {
            position: 'relative',
        },

        carousel: {
            position: 'relative',
            display: 'flex',
            flex: '0 0 auto',
            alignItems: 'flex-start',
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

const Widget = ({ xprops }: Props): ReactElement => {
    const classes = useStyles();
    const { countries, activeCountry, organizations, setActiveCountry } = useContext(OrganizationContext);

    return (
        <Container className={classes.container}>
            <Box maxWidth="md">
                <div className={classes.header}>
                    <WidgetSearch
                        countries={countries}
                        xprops={xprops}
                        onSearchChange={(result: CountrySearch): void => setActiveCountry(result.country)}
                    />
                    <WidgetBar emergencyNumber={activeCountry?.emergencyNumber} />
                </div>
                <Box className={classes.box}>
                    {activeCountry ? (
                        <Container className={classes.carousel}>
                            {organizations?.length > 0 ? (
                                <WidgetCarousel>
                                    {organizations.map((organization) => (
                                        <Box key={organization.slug} my={2}>
                                            <OrganizationCard organization={organization} />
                                        </Box>
                                    ))}
                                </WidgetCarousel>
                            ) : (
                                // TODO: this also spins on 'no results, need to differentiate
                                <Spinner />
                            )}
                        </Container>
                    ) : null}
                </Box>
            </Box>
        </Container>
    );
};

export default Widget;
