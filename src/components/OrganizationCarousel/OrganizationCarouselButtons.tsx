import React, { ReactElement } from 'react';
import { Fab } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

type Props = {
    enabled: boolean;
    onClick: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            border: '1px solid black',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            flexShrink: 0,
            zIndex: theme.zIndex.mobileStepper,
            top: '30%',
            fontSize: '3.5em',
            textAlign: 'center',
        },
        prevIcon: {
            left: '0em',
            '@media (max-width: 320px)': {
                display: 'none',
            },
        },
        nextIcon: {
            right: '0em',
            '@media (max-width: 320px)': {
                display: 'none',
            },
        },
        icon: {
            fontSize: 'inherit',
        },
    }),
);

export const PrevButton = ({ enabled, onClick }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Fab
            onClick={onClick}
            aria-label="scroll-previous"
            data-testid="scroll-previous"
            className={`${classes.fab} ${classes.prevIcon}`}
            disabled={!enabled}
        >
            <ChevronLeftIcon className={`${classes.icon}`} />
        </Fab>
    );
};

export const NextButton = ({ enabled, onClick }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Fab
            onClick={onClick}
            aria-label="scroll-next"
            data-testid="scroll-next"
            className={`${classes.fab} ${classes.nextIcon}`}
            disabled={!enabled}
        >
            <ChevronRightIcon className={`${classes.icon}`} />
        </Fab>
    );
};
