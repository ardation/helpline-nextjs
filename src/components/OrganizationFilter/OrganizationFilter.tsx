import React, { ReactElement, useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
    showMax?: number;
    preselectedTopics?: Topic[];
    preselectedCategories?: Category[];
    preselectedHumanSupportTypes?: HumanSupportType[];
    onChange: (changes: Changes) => void;
    onApply?: (value: boolean) => void;
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
            alignItems: 'top',
        },
        heading: {
            fontWeight: 'bold',
            [theme.breakpoints.down('xs')]: {
                fontSize: '16px',
            },
        },
        title: {
            marginBottom: theme.spacing(1),
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px',
            },
        },
        button: {
            borderRadius: '1000px',
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px',
            },
        },
    }),
);

const OrganizationFilter = ({
    categories,
    humanSupportTypes,
    topics,
    preselectedTopics,
    preselectedCategories,
    preselectedHumanSupportTypes,
    onChange,
    showMax,
    onApply,
}: Props): ReactElement => {
    const classes = useStyles();
    const [selectedContactMethods, setSelectedContactMethods] = useState<ContactMethod[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [selectedHumanSupportTypes, setSelectedHumanSupportTypes] = useState<HumanSupportType[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [selectedSorts, setSelectedSorts] = useState<Sort[]>([{ name: 'A – Z' }]);

    const onClick = (): void => {
        onChange({
            contactMethods: selectedContactMethods,
            categories: selectedCategories,
            humanSupportTypes: selectedHumanSupportTypes,
            topics: selectedTopics,
            sorts: selectedSorts,
        });
        onApply && onApply(false);
    };

    useEffect(() => {
        setSelectedTopics(preselectedTopics);
    }, [preselectedTopics]);

    return (
        <Container className={classes.container}>
            <Box className={classes.header} mt={2}>
                <Typography className={classes.heading} variant="h6">
                    Filter &amp; Sort
                </Typography>
                <Button className={classes.button} variant="contained" color="primary" onClick={onClick}>
                    Apply
                </Button>
            </Box>
            <Box mb={3}>
                {topics && topics.length > 0 && (
                    <Box my={2}>
                        <Typography className={classes.title}>Topics</Typography>
                        <ItemSelect
                            items={topics}
                            preselectedItems={preselectedTopics}
                            onChange={setSelectedTopics}
                            hideUnselected={preselectedTopics && preselectedTopics.length > 0}
                            showMax={showMax}
                        />
                    </Box>
                )}
                <Box my={2}>
                    <Typography className={classes.title}>Contact Method</Typography>
                    <ItemSelect
                        items={[{ name: 'Phone' }, { name: 'Text' }, { name: 'Web Chat' }]}
                        onChange={setSelectedContactMethods}
                    />
                </Box>
                {humanSupportTypes && humanSupportTypes.length > 0 && (
                    <Box my={2}>
                        <Typography className={classes.title}>Human Support Type</Typography>
                        <ItemSelect
                            items={humanSupportTypes}
                            preselectedItems={preselectedHumanSupportTypes}
                            onChange={setSelectedHumanSupportTypes}
                            showMax={showMax}
                        />
                    </Box>
                )}
                {categories && categories.length > 0 && (
                    <Box my={2}>
                        <Typography className={classes.title}>Categories</Typography>
                        <ItemSelect
                            items={categories}
                            preselectedItems={preselectedCategories}
                            onChange={setSelectedCategories}
                            showMax={showMax}
                        />
                    </Box>
                )}
                <Box my={2}>
                    <Typography className={classes.title}>Sort by</Typography>
                    <ItemSelect
                        items={[{ name: 'A – Z' }, { name: 'Open now' }]}
                        preselectedItems={selectedSorts}
                        onChange={setSelectedSorts}
                        single
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default OrganizationFilter;
