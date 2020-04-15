/* eslint-disable no-use-before-define */
import React, { ReactElement, Fragment, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';
import { sortBy } from 'lodash/fp';

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
    countries: Country[];
    onCountryChange: (country: Country) => void;
    onSubdivisionChange: (subdivision: Subdivision) => void;
    xprops?: any;
};

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
const countryToFlag = (isoCode: string): string => {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'auto !important',
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(1),
        },
        inputRoot: {
            borderRadius: '48px',
            backgroundColor: '#EEEDF4',
            '&[class*="MuiOutlinedInput-root"]': {
                paddingTop: '5px',
                paddingBottom: '5px',
            },
            '& fieldset': {
                border: 0,
            },
        },
        option: {
            '& > span': {
                marginRight: 10,
            },
        },
        popupIndicator: {
            color: '#ffffff',
            backgroundColor: '#278686',
            transform: 'rotate(90deg)',
            marginLeft: theme.spacing(1),
            '&:hover': {
                backgroundColor: '#278686',
            },
        },
        popupIndicatorOpen: {
            transform: 'rotate(90deg)',
        },
        paper: {
            borderRadius: '20px',
            backgroundColor: '#EEEDF4',
            boxShadow: 'none',
        },
    }),
);

const CountrySelect = ({ countries, onCountryChange, onSubdivisionChange, xprops }: Props): ReactElement => {
    const classes = useStyles();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const setSelectedSubdivision = useState<Subdivision | undefined>(undefined)[1];

    const localOnCountryChange = (country: Country): void => {
        setSelectedCountry(country);
        onCountryChange(country);
        setSelectedSubdivision(undefined);
        onSubdivisionChange(undefined);
    };

    const localOnSubdivisionChange = (subdivision: Subdivision): void => {
        setSelectedSubdivision(subdivision);
        onSubdivisionChange(subdivision);
    };

    const setDefaultCountry = (): void => {
        if (xprops) {
            localOnCountryChange(
                countries.filter((country: Country) => {
                    return country.code === xprops?.countryCode;
                })[0],
            );
        } else {
            // localOnCountryChange(countries[0]);
        }
    };

    useEffect(() => {
        setDefaultCountry();
    }, [xprops]);

    return (
        <Box className={classes.box}>
            <Autocomplete
                value={selectedCountry}
                style={{ width: 300 }}
                options={sortBy('name', countries) as Country[]}
                classes={{
                    root: classes.root,
                    inputRoot: classes.inputRoot,
                    option: classes.option,
                    popupIndicator: classes.popupIndicator,
                    popupIndicatorOpen: classes.popupIndicatorOpen,
                    paper: classes.paper,
                }}
                popupIcon={<SearchIcon />}
                autoHighlight
                getOptionLabel={(option): string => option.name}
                renderOption={(option): ReactElement => (
                    <Fragment>
                        <span data-testid="countryFlag">{countryToFlag(option.code)}</span>
                        {option.name}
                    </Fragment>
                )}
                openOnFocus={true}
                onChange={(_e, value: Country): void => localOnCountryChange(value)}
                renderInput={(params): ReactElement => (
                    <TextField
                        {...params}
                        placeholder="Start typing your country..."
                        variant="outlined"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                            'data-testid': 'countryInput',
                        }}
                    />
                )}
            />
            {selectedCountry && selectedCountry.subdivisions.length > 0 && (
                <Autocomplete
                    classes={{
                        root: classes.root,
                        inputRoot: classes.inputRoot,
                        option: classes.option,
                        paper: classes.paper,
                    }}
                    options={sortBy('name', selectedCountry.subdivisions) as Subdivision[]}
                    getOptionLabel={(option): string => option.name}
                    openOnFocus={true}
                    onChange={(_e, value: Subdivision): void => localOnSubdivisionChange(value)}
                    renderInput={(params): ReactElement => (
                        <TextField {...params} placeholder="State or province (optional)" variant="outlined" />
                    )}
                />
            )}
        </Box>
    );
};

export default CountrySelect;
