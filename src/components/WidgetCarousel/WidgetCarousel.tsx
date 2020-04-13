import React, { useState, ReactElement, ReactNode } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ScrollButton from '../../icons/ScrollButton.svg';

type Props = {
    children: ReactNode;
    ScrollButton?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type SvgProps = {
    className: string;
    onClick: () => void;
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
        container: {
            position: 'relative',
        },
        carouselWrapper: {
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'flex-start',
        },
        leftIcon: {
            position: 'absolute',
            zIndex: theme.zIndex.mobileStepper,
            top: '40%',
            height: '5em',
            left: '-4em',
            transform: 'rotate(180deg)',
        },
        rightIcon: {
            position: 'absolute',
            zIndex: theme.zIndex.mobileStepper,
            top: '40%',
            height: '5em',
            right: '-4em',
        },
    }),
);

const WidgetCarousel = ({ children }: Props): ReactElement => {
    const classes = useStyles();
    const [embla, setEmbla] = useState(null);

    return (
        <>
            <Container className={classes.container}>
                <ScrollButton className={classes.leftIcon} onClick={(): void => embla.scrollPrev()} />
                <EmblaCarouselReact emblaRef={setEmbla} options={{ loop: false, align: 'start' }}>
                    <Container className={classes.carouselWrapper}>{children}</Container>
                </EmblaCarouselReact>
                <ScrollButton className={classes.rightIcon} onClick={(): void => embla.scrollNext()} />
            </Container>
        </>
    );
};

export default WidgetCarousel;
