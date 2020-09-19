import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ItemSelect from '../ItemSelect';

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
            backgroundColor: theme.palette.text.primary,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.text.primary,
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

    return (
        <Box className={classes.box}>
            <Box mb={1} className={classes.heading}>
                <Typography className={classes.text}>Select topic or topics (optional)</Typography>
            </Box>
            <ItemSelect items={topics} onChange={onChange} max={10} />
        </Box>
    );
};

export default TopicSelect;
