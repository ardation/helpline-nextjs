/* eslint-disable no-use-before-define */
import React, { ReactElement, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

type Country = {
    code: string;
    name: string;
};

type Props = {
    countries: Country[];
    onChange: (country: Country) => void;
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

const CountrySelect = ({ countries, onChange }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Fragment>
            <Autocomplete
                style={{ width: 300 }}
                options={countries}
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
                onChange={(_e, value: Country): void => onChange(value)}
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
        </Fragment>
    );
};

export default CountrySelect;
