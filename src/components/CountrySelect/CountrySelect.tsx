/* eslint-disable no-use-before-define */
import React, { ReactElement, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { createStyles, makeStyles, Box, Grid, InputAdornment } from '@material-ui/core';
import { sortBy, compact } from 'lodash/fp';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { CircleFlag } from 'react-circle-flags';
import { LocalityEnum } from '../../../types/globalTypes';
import SearchIcon from '../../assets/search-icon.svg';

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

const useStyles = makeStyles((theme) =>
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
            borderRadius: '28px',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            '& fieldset': {
                border: 0,
            },
        },
        focused: {
            '&[aria-expanded="true"]': {
                '& .MuiAutocomplete-inputRoot': {
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            },
        },
        option: {
            '& > span': {
                marginRight: 10,
            },
        },
        inputAdornment: {
            paddingLeft: theme.spacing(1.5),
            '& svg': {
                fill: theme.palette.primary.main,
                width: 25,
                height: 25,
            },
        },
        paper: {
            borderRadius: '20px',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            marginTop: -5,
        },
        popupIcon: {
            color: theme.palette.text.secondary,
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
                popupIcon={<ExpandMoreRoundedIcon className={classes.popupIcon} />}
                aria-label="country"
                value={selectedCountry}
                style={{ width: 300 }}
                options={sortBy('name', countries) as Country[]}
                classes={{
                    root: classes.root,
                    inputRoot: classes.inputRoot,
                    option: classes.option,
                    paper: classes.paper,
                    focused: classes.focused,
                }}
                autoHighlight
                getOptionLabel={(option): string => option.name}
                getOptionSelected={(option, value): boolean => option.code === value.code}
                renderOption={(option): ReactElement => {
                    const code = option.code === 'GB-NIR' ? 'gb' : option.code.toLowerCase();
                    return (
                        <Grid container spacing={2}>
                            <Grid item>
                                <CircleFlag countryCode={code} height={25} data-testid="countryFlag" />
                            </Grid>
                            <Grid item>{option.name}</Grid>
                        </Grid>
                    );
                }}
                blurOnSelect="touch"
                openOnFocus
                onChange={(_e, value: Country): void => localOnCountryChange(value)}
                renderInput={(params): ReactElement => (
                    <TextField
                        {...params}
                        placeholder="Start typing your country..."
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start" className={classes.inputAdornment}>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
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
                    popupIcon={<ExpandMoreRoundedIcon className={classes.popupIcon} />}
                    aria-label="subdivision"
                    classes={{
                        root: classes.root,
                        inputRoot: classes.inputRoot,
                        option: classes.option,
                        paper: classes.paper,
                        focused: classes.focused,
                    }}
                    value={selectedSubdivision}
                    options={sortBy('name', selectedCountry.subdivisions) as Subdivision[]}
                    getOptionLabel={(option): string => option.name}
                    getOptionSelected={(option, value): boolean => option.code === value.code}
                    blurOnSelect="touch"
                    openOnFocus
                    onChange={(_e, value: Subdivision): void => localOnSubdivisionChange(value)}
                    renderInput={(params): ReactElement => (
                        <TextField
                            {...params}
                            placeholder={
                                (selectedCountry.locality === LocalityEnum.COUNTY && 'Refine by county (optional)') ||
                                (selectedCountry.locality === LocalityEnum.LOCATION &&
                                    'Refine by location (optional)') ||
                                (selectedCountry.locality === LocalityEnum.PROVINCE &&
                                    'Refine by province (optional)') ||
                                (selectedCountry.locality === LocalityEnum.REGION && 'Refine by region (optional)') ||
                                (selectedCountry.locality === LocalityEnum.STATE && 'Refine by state (optional)')
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
