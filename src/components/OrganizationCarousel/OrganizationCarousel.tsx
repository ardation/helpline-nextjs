import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Container } from '@material-ui/core';
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
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
    const matches = useMediaQuery('(min-width: 400px)');

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
                    condition={matches}
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
