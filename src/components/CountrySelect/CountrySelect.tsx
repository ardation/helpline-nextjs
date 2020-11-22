/* eslint-disable no-use-before-define */
import React, { ReactElement, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Box, Grid } from '@material-ui/core';
import { sortBy, compact } from 'lodash/fp';
import Flag from 'react-world-flags';
import { LocalityEnum } from '../../../types/globalTypes';

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
    emergencyNumber?: string;
    locality: LocalityEnum;
};

type Props = {
    countries: Country[];
    onCountryChange: (country: Country) => void;
    onSubdivisionChange: (subdivision: Subdivision) => void;
    inline?: boolean;
    preselectedCountry?: Country;
    preselectedSubdivision?: Subdivision;
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
        inline: {
            gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr',
            },
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

const CountrySelect = ({
    countries,
    onCountryChange,
    onSubdivisionChange,
    inline,
    preselectedCountry,
    preselectedSubdivision,
}: Props): ReactElement => {
    const classes = useStyles();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(preselectedCountry ?? null);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | null>(preselectedSubdivision ?? null);

    const localOnCountryChange = (country: Country): void => {
        setSelectedCountry(country);
        onCountryChange(country);
        setSelectedSubdivision(null);
        onSubdivisionChange(null);
    };

    const localOnSubdivisionChange = (subdivision: Subdivision): void => {
        setSelectedSubdivision(subdivision);
        onSubdivisionChange(subdivision);
    };

    return (
        <Box className={compact([classes.box, inline && classes.inline]).join(' ')}>
            <Autocomplete
                aria-label="country"
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
                getOptionSelected={(option, value): boolean => option.code == value.code}
                renderOption={(option): ReactElement => (
                    <Grid container spacing={2}>
                        <Grid item>
                            <Flag code={option.code} width={20} data-testid="countryFlag" />
                        </Grid>
                        <Grid item>{option.name}</Grid>
                    </Grid>
                )}
                blurOnSelect="touch"
                openOnFocus
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
                            'aria-label': 'Start typing your country...',
                        }}
                    />
                )}
            />
            {selectedCountry && selectedCountry.subdivisions.length > 0 && (
                <Autocomplete
                    aria-label="subdivision"
                    classes={{
                        root: classes.root,
                        inputRoot: classes.inputRoot,
                        option: classes.option,
                        paper: classes.paper,
                    }}
                    value={selectedSubdivision}
                    options={sortBy('name', selectedCountry.subdivisions) as Subdivision[]}
                    getOptionLabel={(option): string => option.name}
                    getOptionSelected={(option, value): boolean => option.code == value.code}
                    blurOnSelect="touch"
                    openOnFocus
                    onChange={(_e, value: Subdivision): void => localOnSubdivisionChange(value)}
                    renderInput={(params): ReactElement => (
                        <TextField
                            {...params}
                            placeholder={
                                (selectedCountry.locality == LocalityEnum.COUNTY && 'Refine by county (optional)') ||
                                (selectedCountry.locality == LocalityEnum.LOCATION &&
                                    'Refine by location (optional)') ||
                                (selectedCountry.locality == LocalityEnum.PROVINCE &&
                                    'Refine by province (optional)') ||
                                (selectedCountry.locality == LocalityEnum.REGION && 'Refine by region (optional)') ||
                                (selectedCountry.locality == LocalityEnum.STATE && 'Refine by state (optional)')
                            }
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                                'data-testid': 'subdivisionInput',
                                'aria-label': 'Refine by location',
                            }}
                        />
                    )}
                />
            )}
        </Box>
    );
};

export default CountrySelect;
