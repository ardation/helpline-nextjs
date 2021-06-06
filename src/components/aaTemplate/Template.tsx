import React, { ReactElement } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

type Props = {
    text?: string;
};

const useStyles = makeStyles((theme) =>
    createStyles({
        template: {
            padding: theme.spacing(1),
        },
    }),
);

const Template = ({ text }: Props): ReactElement => {
    const classes = useStyles();

    return <div className={classes.template}>{text}</div>;
};

export default Template;
