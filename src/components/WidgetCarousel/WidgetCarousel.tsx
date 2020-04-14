import React, { useState, useEffect, ReactElement, ReactNode } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Fab } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useWindowSize from '../../util/useWindowSize';

type WidgetCarouselProps = {
    children: ReactNode;
    ScrollButton?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type size = {
    height?: number;
    width?: number;
};

type ConditionalWrapperProps = {
    condition: boolean;
    wrapper: (children: JSX.Element) => JSX.Element;
    children: JSX.Element;
};

type embla = {
    canScrollNext: () => boolean;
    canScrollPrev: () => boolean;
    scrollNext: () => void;
    scrollPrev: () => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        carouselWrapper: {
            display: 'flex',
            alignItems: 'flex-start',
            '@media (max-width: 320px)': {
                flexDirection: 'column',
                maxHeight: '500px',
            },
        },
        fab: {
            position: 'absolute',
            border: '1px solid black',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            flexShrink: 0,
            zIndex: theme.zIndex.mobileStepper,
            top: '40%',
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
            fontSize: '4em',
        },
    }),
);

const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps): ReactElement =>
    condition ? wrapper(children) : children;

const WidgetCarousel = ({ children }: WidgetCarouselProps): ReactElement => {
    const classes = useStyles();
    const size = useWindowSize();
    const [embla, setEmbla] = useState(null);

    useEffect(() => {
        console.log(size);
    });

    return (
        <>
            <Fab
                onClick={(): void => embla.scrollPrev()}
                aria-label="text"
                className={`${classes.fab} ${classes.prevIcon}`}
            >
                <ChevronLeftIcon className={`${classes.icon}`} />
            </Fab>

            <ConditionalWrapper
                condition={size.width >= 320}
                wrapper={(children): JSX.Element => (
                    <EmblaCarouselReact emblaRef={setEmbla} options={{ loop: false, align: 'start' }}>
                        {children}
                    </EmblaCarouselReact>
                )}
            >
                <Container className={classes.carouselWrapper}>{children}</Container>
            </ConditionalWrapper>
            <Fab
                onClick={(): void => embla.scrollNext()}
                aria-label="text"
                className={`${classes.fab} ${classes.nextIcon}`}
            >
                <ChevronRightIcon className={`${classes.icon}`} />
            </Fab>
        </>
    );
};

export default WidgetCarousel;
