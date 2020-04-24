import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Theme } from '@material-ui/core';
import { useWindowResize } from 'beautiful-react-hooks';
import ConditionalWrapper from '../../util/conditionalWrapper';
import { Organization } from '../../context/organizationContext';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import { PrevButton, NextButton } from './OrganizationCarouselButtons';

type Props = {
    organizations: Organization[];
    widget?: boolean;
};

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            position: 'relative',
        },
        carouselWrapper: {
            display: 'flex',
            position: 'relative',
            maxHeight: '420px',
            alignItems: 'flex-start',
            '@media (max-width: 400px)': {
                flexDirection: 'column',
                overflow: 'scroll',
            },
        },
    }),
);

const OrganizationCarousel = ({ organizations, widget }: Props): ReactElement => {
    const classes = useStyles();
    const [embla, setEmbla] = useState(null);

    const scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla.scrollNext(), [embla]);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [width, setWidth] = useState(undefined);

    useWindowResize(() => {
        if (typeof window !== 'undefined') {
            return setWidth(window.innerWidth);
        }
        setWidth(1024);
    });

    useEffect(() => {
        const onSelect = (): void => {
            setPrevBtnEnabled(embla.canScrollPrev());
            setNextBtnEnabled(embla.canScrollNext());
        };
        if (embla) {
            embla.on('select', onSelect);
            onSelect();
        }
    }, [embla]);

    return (
        <Container className={classes.container}>
            {organizations && organizations.length > 0 && (
                <ConditionalWrapper
                    condition={width >= 400}
                    wrapper={(children): ReactElement => (
                        <EmblaCarouselReact
                            emblaRef={setEmbla}
                            options={{
                                loop: false,
                                align: 'start',
                                containScroll: true,
                            }}
                        >
                            {children}
                        </EmblaCarouselReact>
                    )}
                >
                    <Container className={classes.carouselWrapper}>
                        {organizations.map((organization, index) => (
                            <Box key={index + organization.slug} p={2}>
                                <OrganizationCard widget={widget} organization={organization} />
                            </Box>
                        ))}
                    </Container>
                </ConditionalWrapper>
            )}
            {prevBtnEnabled && <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />}
            {nextBtnEnabled && <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />}
        </Container>
    );
};

export default OrganizationCarousel;
