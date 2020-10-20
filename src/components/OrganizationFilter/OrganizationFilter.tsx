import React, { ReactElement, useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Box, Typography, Button, Tab, Tabs, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import ItemSelect from '../ItemSelect/ItemSelect';

type ContactMethod = {
    name: string;
};

type Category = {
    name: string;
};

type HumanSupportType = {
    name: string;
};

type Topic = {
    name: string;
};

type Sort = {
    name: string;
};

type Changes = {
    contactMethods: ContactMethod[];
    categories: Category[];
    humanSupportTypes: HumanSupportType[];
    topics: Topic[];
    sorts: Sort[];
};

type Props = {
    categories?: Category[];
    humanSupportTypes?: HumanSupportType[];
    topics?: Topic[];
    preselectedTopics?: Topic[];
    onChange: (changes: Changes) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: 0,
        },
        header: {
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
        },
        heading: {
            fontWeight: 'bold',
        },
        title: {
            marginBottom: theme.spacing(1),
        },
        button: {
            borderRadius: '1000px',
        },
        tabs: {
            borderTop: '1px solid #000',
        },
        tab: {
            padding: theme.spacing(1, 0),
            textTransform: 'capitalize',
            '&.Mui-selected': {
                fontWeight: 'bold',
            },
        },
        tabPanel: {
            padding: theme.spacing(0, 2, 2, 2),
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(0, 3, 3, 3),
            },
        },
    }),
);

const OrganizationFilter = ({
    categories,
    humanSupportTypes,
    topics,
    preselectedTopics,
    onChange,
}: Props): ReactElement => {
    const classes = useStyles();
    const [selectedContactMethods, setSelectedContactMethods] = useState<ContactMethod[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [selectedHumanSupportTypes, setSelectedHumanSupportTypes] = useState<HumanSupportType[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [selectedSorts, setSelectedSorts] = useState<Sort[]>([
        { name: preselectedTopics?.length ? 'Relevance' : 'Featured' },
    ]);
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };

    const handleChangeIndex = (value: number): void => {
        setValue(value);
    };

    const handleSelectedTopicsChange = (topics: Topic[]): void => {
        setSelectedTopics(topics);
        if (topics.length > 0 && selectedSorts[0]?.name === 'Featured') {
            setSelectedSorts([{ name: 'Relevance' }]);
        } else if (topics.length === 0 && selectedSorts[0]?.name === 'Relevance') {
            setSelectedSorts([{ name: 'Featured' }]);
        }
    };

    const onClick = (): void => {
        ReactGA.event({
            category: 'User',
            action: 'Changed Filters',
        });
        onChange({
            contactMethods: selectedContactMethods,
            categories: selectedCategories,
            humanSupportTypes: selectedHumanSupportTypes,
            topics: selectedTopics,
            sorts: selectedSorts,
        });
    };

    useEffect(() => {
        if (preselectedTopics) {
            setSelectedTopics(preselectedTopics);
        }
    }, [preselectedTopics]);

    return (
        <Container className={classes.container}>
            <Box className={classes.tabPanel}>
                <Box my={2} className={classes.header}>
                    <Typography className={classes.heading} variant="h6">
                        Filter &amp; Sort
                    </Typography>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={onClick}
                        size="large"
                    >
                        Apply
                    </Button>
                </Box>
                <Tabs
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    className={classes.tabs}
                    value={value}
                >
                    <Tab
                        className={classes.tab}
                        label={`Topics${selectedTopics.length > 0 ? ` (${selectedTopics.length})` : ''}`}
                    />
                    <Tab
                        className={classes.tab}
                        label={`Specialty${selectedCategories.length > 0 ? ` (${selectedCategories.length})` : ''}`}
                    />
                    <Tab className={classes.tab} label="Support Type" />
                </Tabs>
            </Box>
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                <Box className={classes.tabPanel}>
                    <ItemSelect
                        items={topics || []}
                        preselectedItems={preselectedTopics}
                        onChange={handleSelectedTopicsChange}
                    />
                </Box>
                <Box className={classes.tabPanel}>
                    <ItemSelect items={categories || []} onChange={setSelectedCategories} />
                </Box>
                <Box className={classes.tabPanel}>
                    <Box mb={2}>
                        <Typography className={classes.title}>Contact Method</Typography>
                        <ItemSelect
                            items={[{ name: 'Phone' }, { name: 'Text' }, { name: 'Web Chat' }]}
                            onChange={setSelectedContactMethods}
                        />
                    </Box>
                    {humanSupportTypes && humanSupportTypes.length > 0 && (
                        <Box my={2}>
                            <Typography className={classes.title}>Live Support Type</Typography>
                            <ItemSelect items={humanSupportTypes} onChange={setSelectedHumanSupportTypes} max={7} />
                        </Box>
                    )}
                    <Box my={2}>
                        <Typography className={classes.title}>Sort by</Typography>
                        <ItemSelect
                            items={[
                                { name: 'Relevance' },
                                { name: 'Featured' },
                                { name: 'Verified' },
                                { name: 'A – Z' },
                                { name: 'Open now' },
                            ]}
                            preselectedItems={selectedSorts}
                            onChange={setSelectedSorts}
                            single
                        />
                    </Box>
                </Box>
            </SwipeableViews>
        </Container>
    );
};

export default OrganizationFilter;
