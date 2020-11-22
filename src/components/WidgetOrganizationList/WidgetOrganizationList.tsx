import React, { useState, useEffect, ReactElement } from 'react';
import { useEmblaCarousel } from 'embla-carousel-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Fab } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import OrganizationCard, { Organization } from '../OrganizationCard/OrganizationCard';
import OrganizationEmpty from '../OrganizationEmpty';

type Props = {
    organizations: Organization[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            position: 'relative',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        container: {
            marginLeft: '-1rem',
            display: 'flex',
        },
        slide: {
            flex: '0 0 auto',
            width: '80%',
            position: 'relative',
            paddingLeft: '1rem',
            '&:first-child': {
                marginLeft: '2.6rem',
            },
            [theme.breakpoints.up('sm')]: {
                width: '40%',
                '&:first-child': {
                    marginLeft: '4.8rem',
                },
            },
        },
        button: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '3rem',
            [theme.breakpoints.down('xs')]: {
                width: 36,
                height: 36,
                fontSize: '1.5rem',
            },
        },
        buttonLeft: {
            left: '0.8rem',
            [theme.breakpoints.down('xs')]: {
                left: '0.4rem',
            },
        },
        buttonRight: {
            right: '0.8rem',
            [theme.breakpoints.down('xs')]: {
                right: '0.4rem',
            },
        },
    }),
);

const WidgetOrganizationList = ({ organizations }: Props): ReactElement => {
    const classes = useStyles();
    const [EmblaCarouselReact, embla] = useEmblaCarousel({
        align: 'start',
    });

    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

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

    useEffect(() => {
        if (embla) {
            embla.scrollTo(0);
            embla.changeOptions({
                align: 'start',
            });
        }
    }, [organizations]);

    return (
        <Box className={classes.box}>
            {organizations.length > 0 && (
                <>
                    <EmblaCarouselReact>
                        <Box className={classes.container}>
                            {organizations.map((organization) => (
                                <Box key={organization.slug} className={classes.slide} data-testid="OrganizationCard">
                                    <OrganizationCard organization={organization} variant="widget" />
                                </Box>
                            ))}
                        </Box>
                    </EmblaCarouselReact>
                    <Fab
                        className={[classes.button, classes.buttonLeft].join(' ')}
                        disabled={!showPreviousButton}
                        onClick={(): void => embla.scrollPrev()}
                        data-testid="previousButton"
                        aria-label="previous"
                    >
                        <ChevronLeftIcon fontSize="inherit" />
                    </Fab>
                    <Fab
                        className={[classes.button, classes.buttonRight].join(' ')}
                        disabled={!showNextButton}
                        onClick={(): void => embla.scrollNext()}
                        data-testid="nextButton"
                        aria-label="next"
                    >
                        <ChevronRightIcon fontSize="inherit" />
                    </Fab>
                </>
            )}
            {organizations.length == 0 && <OrganizationEmpty />}
        </Box>
    );
};

export default WidgetOrganizationList;
