import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Chip, Container, Box, Typography, Button } from '@material-ui/core';
import { find, xor, sortBy } from 'lodash/fp';

type Filter = {
    name: string;
};

type FilterResponse = {
    topics?: Filter[];
    categories?: Filter[];
    humanSupportTypes?: Filter[];
    contactMethods?: Filter[];
};

type Props = {
    topics?: Filter[];
    categories?: Filter[];
    humanSupportTypes?: Filter[];
    contactMethods?: Filter[];
    // sortByKeys?: any[];
    onApply: (selectedFilters: FilterResponse) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            overflowY: 'scroll',
            textAlign: 'left',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
        },
        heading: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        sectionContainer: {
            marginBottom: '1rem',
        },
        subheading: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
        },
        chips: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
                marginRight: theme.spacing(0.5),
                marginBottom: theme.spacing(0.5),
            },
        },
        chipRoot: {
            fontWeight: 600,
        },
        chipColorPrimary: {
            backgroundColor: '#000000',
            '&:hover, &:focus': {
                backgroundColor: '#000000',
            },
        },
        button: {
            borderColor: 'black',
            borderRadius: '1000px',
        },
    }),
);

const WidgetFilterSort = (props: Props): ReactElement => {
    const classes = useStyles();
    const [selectedFilters, setSelectedFilters] = useState({
        topics: [],
        categories: [],
        humanSupportTypes: [],
        contactMethods: [],
    });

    const filterSections = Object.keys(selectedFilters).reduce((prev, key) => {
        const title = key.replace(/([A-Z])/g, ' $1');
        props[key]?.length > 0 &&
            prev.push({
                key,
                title: title.charAt(0).toUpperCase() + title.slice(1),
                options: props[key],
            });
        return prev;
    }, []);

    const toggleChip = (key: string, value: Filter): void => {
        const selected = sortBy('name', xor([value], selectedFilters[key]));
        setSelectedFilters({ ...selectedFilters, [key]: selected });
    };

    return (
        <Container className={classes.container}>
            <Box mb={1}>
                <Typography className={classes.heading}>Filter & Sort</Typography>
            </Box>
            {filterSections.map((section) => (
                <Box className={classes.sectionContainer} key={section.key}>
                    <Typography className={classes.subheading}>{section.title}</Typography>
                    <Box className={classes.chips}>
                        {props[section.key].map((item) => (
                            <Chip
                                color={find(item, selectedFilters[section.key]) ? 'primary' : 'default'}
                                key={item.name}
                                label={item.name}
                                onClick={(): void => toggleChip(section.key, item)}
                                data-testid="filterChip"
                                classes={{
                                    root: classes.chipRoot,
                                    colorPrimary: classes.chipColorPrimary,
                                    clickableColorPrimary: classes.chipColorPrimary,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            ))}
            <Box className={'classes.footer'}>
                <Button
                    data-testid="applyButton"
                    className={classes.button}
                    variant="outlined"
                    onClick={(): void => props.onApply(selectedFilters)}
                >
                    Apply
                </Button>
            </Box>
        </Container>
    );
};

export default WidgetFilterSort;
