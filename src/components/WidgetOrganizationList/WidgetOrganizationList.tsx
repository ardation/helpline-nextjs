import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Container } from '@material-ui/core';
import EmblaCarousel from 'embla-carousel';
import ConditionalWrapper from '../../util/conditionalWrapper';
import { Organization } from '../../context/organizationContext';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';

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

const WidgetOrganizationList = ({ organizations, widget }: Props): ReactElement => {
    const classes = useStyles();
    const [embla, setEmbla] = useState<EmblaCarousel>(undefined);

    const scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla.scrollNext(), [embla]);
    const [showPreviousButton, setShowPreviousButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(true);
    const matches = useMediaQuery('(min-width: 400px)');

    useEffect(() => {
        const onSelect = (): void => {
            setShowPreviousButton(embla.canScrollPrev());
            setShowNextButton(embla.canScrollNext());
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
            {showPreviousButton && <PreviousButton onClick={scrollPrev} enabled={showPreviousButton} />}
            {showNextButton && <NextButton onClick={scrollNext} enabled={showNextButton} />}
        </Container>
    );
};

export default WidgetOrganizationList;
