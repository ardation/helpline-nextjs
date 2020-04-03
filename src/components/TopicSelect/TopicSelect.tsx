import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Chip, Box, Typography } from '@material-ui/core';
import { find, xor, sortBy } from 'lodash/fp';

type Topic = {
    name: string;
};

type Props = {
    topics: Topic[];
    onChange: (topics: Topic[]) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            border: '1px solid #000',
            borderRadius: '10px',
            padding: theme.spacing(1),
            textAlign: 'left',
        },
        heading: {
            fontSize: '0.8rem',
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
        text: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
        },
    }),
);

const TopicSelect = ({ topics, onChange }: Props): ReactElement => {
    const classes = useStyles();
    const [selectedTopics, setSelectedTopics] = useState([]);

    const onClick = (topic: Topic): void => {
        const topics = sortBy('name', xor([topic], selectedTopics));
        setSelectedTopics(topics);
        onChange(topics);
    };

    return (
        <Box className={classes.box}>
            <Box mb={1} className={classes.heading}>
                <Typography className={classes.text}>Select topics (optional)</Typography>
            </Box>
            <Box className={classes.chips}>
                {topics.map((topic) => (
                    <Chip
                        color={find(topic, selectedTopics) ? 'primary' : 'default'}
                        key={topic.name}
                        label={topic.name}
                        onClick={(): void => onClick(topic)}
                        data-testid="topicChip"
                        classes={{
                            root: classes.chipRoot,
                            colorPrimary: classes.chipColorPrimary,
                            clickableColorPrimary: classes.chipColorPrimary,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TopicSelect;
