import React, { useState, ReactElement, ReactNode } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { ReactComponent as ScrollButton } from '../../icons/ScrollButton.svg';

type Props = {
    children: ReactNode;
    ScrollButton?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type ScrollButtonProps = {
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

const ClickableScrollButton = ({ className, onClick }: ScrollButtonProps): ReactElement => {
    return <ScrollButton className={className} onClick={onClick} />;
};

const WidgetCarousel = ({ children }: Props): ReactElement => {
    const classes = useStyles();
    const [embla, setEmbla] = useState(null);

    return (
        <>
            <ClickableScrollButton className={classes.leftIcon} onClick={(): void => embla.scrollPrev()} />
            <EmblaCarouselReact emblaRef={setEmbla} options={{ loop: false, align: 'start' }}>
                <Container className={classes.carouselWrapper}>{children}</Container>
            </EmblaCarouselReact>
            <ClickableScrollButton className={classes.rightIcon} onClick={(): void => embla.scrollNext()} />
        </>
    );
};

export default WidgetCarousel;
