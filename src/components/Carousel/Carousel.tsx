import React, { useState, useEffect, ReactElement, ReactNodeArray } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

type Props = {
    children: ReactNodeArray;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            flex: '0 0 auto',
            border: '1px solid #000',
            // borderRadius: '10px',
            overflow: 'scroll',
        },
        container: {
            position: 'relative',
        },
        carouselWrapper: {
            flex: '0 0 auto',
            display: 'flex',
        },
        leftIcon: {
            position: 'absolute',
            backgroundColor: 'transparent',
            left: theme.spacing(1),
            top: '7em',
            alignSelf: 'center',
        },
        rightIcon: {
            position: 'absolute',
            backgroundColor: 'transparent',
            right: theme.spacing(1),
            top: '7em',
            alignSelf: 'center',
        },
    }),
);

const Carousel = ({ children }: Props): ReactElement => {
    const classes = useStyles();
    const [embla, setEmbla] = useState(null);

    useEffect(() => {
        if (embla) {
            embla.on('select', () => {
                console.log(`Current index is ${embla.selectedScrollSnap()}`);
            });
        }
    }, [embla]);

    return (
        <>
            <Container className={classes.container}>
                <ChevronLeftIcon className={classes.leftIcon} onClick={() => embla.scrollPrev()} />
                <EmblaCarouselReact emblaRef={setEmbla} options={{ loop: false, align: 'start' }}>
                    <Container className={classes.carouselWrapper}>{children}</Container>
                </EmblaCarouselReact>
                <ChevronRightIcon className={classes.rightIcon} onClick={() => embla.scrollNext()} />
            </Container>
        </>
    );
};

export default Carousel;
