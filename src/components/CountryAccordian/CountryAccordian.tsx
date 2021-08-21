import React, { ChangeEvent, Fragment, ReactElement, useState } from 'react';
import {
    createStyles,
    Grid,
    makeStyles,
    Button,
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Typography,
    withStyles,
} from '@material-ui/core';
import NextLink from 'next/link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';

type Country = {
    code: string;
    name: string;
    region: string;
};

type Props = {
    countries?: Country[];
};

const Accordion = withStyles({
    root: {
        border: 0,
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        borderBottom: 0,
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
    root: {
        flexDirection: 'column',
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) =>
    createStyles({
        heading: {
            fontFamily: theme.typography.h1.fontFamily,
            color: theme.palette.secondary.main,
        },
    }),
);

const CountryAccordian = ({ countries }: Props): ReactElement => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (_event: ChangeEvent, isExpanded: boolean): void => {
            setExpanded(isExpanded ? panel : false);
        };

    const regions: { name: string; countries: Country[] }[] = countries.reduce((result, country) => {
        const region = result.find((region) => region.name === country.region);
        if (region) {
            region.countries.push(country);
        } else {
            result.push({ name: country.region, countries: [country] });
        }
        return result;
    }, []);

    return (
        <>
            {regions.map((region) => (
                <Fragment key={region.name}>
                    <Accordion expanded={expanded === region.name} onChange={handleChange(region.name)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                            <Typography variant="h6" className={classes.heading}>
                                {region.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {region.countries.map((country) => (
                                    <Grid item xs={6} key={country.code}>
                                        <NextLink href={`/${country.code.toLowerCase()}`} prefetch={false} passHref>
                                            <Button variant="contained">{country.name}</Button>
                                        </NextLink>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Fragment>
            ))}
        </>
    );
};

export default CountryAccordian;
