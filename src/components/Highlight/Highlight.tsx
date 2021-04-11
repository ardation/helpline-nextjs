import { makeStyles, createStyles, Box, Typography, SvgIconProps } from '@material-ui/core';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme) =>
    createStyles({
        highlight: {
            display: 'grid',
            gridTemplateColumns: '80px 1fr',
            margin: theme.spacing(2, 0),
            padding: theme.spacing(2),
            borderRadius: 10,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.secondary.main,
        },
        title: {
            gridColumn: '2',
            gridRow: '1',
        },
        description: {
            gridColumn: '2',
            gridRow: '2',
        },
        icon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gridRow: '1 / span 2',
            fontSize: '4rem',
        },
    }),
);

interface Props {
    title: string;
    description: string;
    Icon: (props: SvgIconProps) => ReactElement;
}

const Highlight = ({ title, description, Icon }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Box className={classes.highlight}>
            <Box className={classes.icon}>
                <Icon fontSize="inherit" />
            </Box>
            <Typography className={classes.title} variant="h6">
                {title}
            </Typography>
            <Typography className={classes.description}>{description}</Typography>
        </Box>
    );
};

export default Highlight;
