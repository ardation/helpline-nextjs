import React, { ReactElement, useState, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Typography, Button } from '@material-ui/core';
import OrganizationContext from '../../context/organizationContext';
import ItemSelect from '../ItemSelect';

type Filter = {
    name: string;
};

type FilterOptions = {
    topics: Filter[];
    categories: Filter[];
    humanSupportTypes: Filter[];
    contactMethods: Filter[];
    sorts: Filter[];
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

const useStyles = makeStyles(() =>
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
        button: {
            borderRadius: '1000px',
        },
    }),
);

const FilterSort = ({ filterOptions, onApply }: Props): ReactElement => {
    const classes = useStyles();
    const { activeFilters } = useContext(OrganizationContext);
    const [selectedFilters, setSelectedFilters] = useState(activeFilters);

    const filterSections: FilterSection[] = Object.keys(filterOptions).reduce((prev, key) => {
        const title = key.replace(/([A-Z])/g, ' $1');
        filterOptions[key]?.length > 0 &&
            prev.push({
                key,
                title: title.charAt(0).toUpperCase() + title.slice(1),
                options: filterOptions[key],
            });
        return prev;
    }, []);

    const onChange = (key: string, items: Filter[]): void => {
        setSelectedFilters({ ...selectedFilters, [key]: items });
    };

    return (
        <Container className={classes.container}>
            <Box mb={1} className={classes.header}>
                <Typography className={classes.heading}>Filter & Sort</Typography>
                <Button
                    data-testid="applyButton"
                    className={classes.button}
                    variant="outlined"
                    onClick={(): void => onApply(selectedFilters)}
                >
                    Apply Filters
                </Button>
            </Box>
            {filterSections.map((row) => (
                <Box className={classes.sectionContainer} key={row.key}>
                    <Typography className={classes.subheading}>{row.title}</Typography>
                    <ItemSelect
                        items={row.options}
                        preselectedItems={selectedFilters[row.key]}
                        onChange={(items: Filter[]): void => onChange(row.key, items)}
                    />
                </Box>
            ))}
        </Container>
    );
};

export default FilterSort;
