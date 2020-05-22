import React, { ReactElement, useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@material-ui/core';
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
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
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
    const [selectedSorts, setSelectedSorts] = useState<Sort[]>([{ name: 'Featured' }]);

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
            <Box my={2} className={classes.header}>
                <Typography className={classes.heading} variant="h6">
                    Filter &amp; Sort
                </Typography>
                <Button className={classes.button} variant="contained" color="primary" onClick={onClick} size="large">
                    Apply
                </Button>
            </Box>
            <hr />
            <Box my={2}>
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
            {topics && topics.length > 0 && (
                <Box my={2}>
                    <Typography className={classes.title}>Topics</Typography>
                    <ItemSelect
                        items={topics}
                        preselectedItems={preselectedTopics}
                        onChange={setSelectedTopics}
                        max={7}
                    />
                </Box>
            )}
            {categories && categories.length > 0 && (
                <Box my={2}>
                    <Typography className={classes.title}>Categories</Typography>
                    <ItemSelect items={categories} onChange={setSelectedCategories} max={7} />
                </Box>
            )}
            <Box my={2}>
                <Typography className={classes.title}>Sort by</Typography>
                <ItemSelect
                    items={[{ name: 'Featured' }, { name: 'Verified' }, { name: 'A – Z' }, { name: 'Open now' }]}
                    preselectedItems={selectedSorts}
                    onChange={setSelectedSorts}
                    single
                />
            </Box>
        </Container>
    );
};

export default OrganizationFilter;
