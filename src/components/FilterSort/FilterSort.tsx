import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Chip, Container, Box, Typography, Button } from '@material-ui/core';
import { map } from 'lodash/fp';

type Filter = {
    name: string;
    active?: boolean | false;
};

type FilterOptions = {
    topics?: Filter[];
    categories?: Filter[];
    humanSupportTypes?: Filter[];
    contactMethods?: Filter[];
};

type FilterSection = {
    key: string;
    title: string;
    options: Filter[];
};

type Props = {
    filterOptions: FilterOptions;
    showMax?: number;
    onApply: (selectedFilters: FilterOptions) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            overflowY: 'scroll',
            textAlign: 'left',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
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
            borderRadius: '1000px',
        },
    }),
);

const FilterSort = ({ filterOptions, showMax, onApply }: Props): ReactElement => {
    const classes = useStyles();
    const [filters, setFilters] = useState(filterOptions);
    const [max, setMax] = useState(showMax || 10);

    const filterSections: FilterSection[] = Object.keys(filters).reduce((prev, key) => {
        const title = key.replace(/([A-Z])/g, ' $1');
        filters[key]?.length > 0 &&
            prev.push({
                key,
                title: title.charAt(0).toUpperCase() + title.slice(1),
                options: filters[key],
            });
        return prev;
    }, []);

    const toggleChip = (key: string, value: Filter): void => {
        const updated = map(
            (item: Filter) => (item.name === value.name ? { ...item, active: !item.active } : item),
            filters[key],
        );
        setFilters({ ...filters, [key]: updated });
    };

    return (
        <Container className={classes.container}>
            <Box mb={1} className={classes.header}>
                <Typography className={classes.heading}>Filter & Sort</Typography>
                <Button
                    data-testid="applyButton"
                    className={classes.button}
                    variant="outlined"
                    onClick={(): void => onApply(filters)}
                >
                    Apply Filters
                </Button>
            </Box>
            {filterSections.map((section) => (
                <Box className={classes.sectionContainer} key={section.key}>
                    <Typography className={classes.subheading}>{section.title}</Typography>
                    <Box className={classes.chips}>
                        {section.options.map(
                            (item: Filter, index: number) =>
                                index < max && (
                                    <Chip
                                        color={item.active ? 'primary' : 'default'}
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
                                ),
                        )}
                        {section.options.length > max && (
                            <Chip
                                color="default"
                                label={`+${section.options.length - max} More`}
                                onClick={(): void => setMax(100)}
                                data-testid="showMoreChip"
                                classes={{
                                    root: classes.chipRoot,
                                    colorPrimary: classes.chipColorPrimary,
                                    clickableColorPrimary: classes.chipColorPrimary,
                                }}
                            />
                        )}
                    </Box>
                </Box>
            ))}
        </Container>
    );
};

export default FilterSort;
