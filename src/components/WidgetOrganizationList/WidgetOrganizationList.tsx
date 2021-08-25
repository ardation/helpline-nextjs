import React, { useState, useEffect, ReactElement } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import { createStyles, makeStyles, Box, Fab } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded';
import { sortBy } from 'lodash/fp';
import OrganizationCard, { Organization } from '../OrganizationCard/OrganizationCard';
import OrganizationEmpty from '../OrganizationEmpty';

type Props = {
    organizations: Organization[];
    organizationsWhenEmpty: Organization[];
};

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
            position: 'relative',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            overflow: 'hidden',
        },
        container: {
            marginLeft: '4.5rem',
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
                marginLeft: '2.5rem',
            },
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
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
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

const WidgetOrganizationList = ({ organizations, organizationsWhenEmpty }: Props): ReactElement => {
    const classes = useStyles();
    const [emblaRef, embla] = useEmblaCarousel({
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
            embla.reInit({
                align: 'start',
            });
        }
    }, [organizations]);

    return (
        <Box className={classes.box}>
            {organizations.length === 0 && organizationsWhenEmpty.length === 0 && (
                <OrganizationEmpty organizations={organizationsWhenEmpty} variant="widget" />
            )}
            {(organizations.length > 0 || organizationsWhenEmpty.length > 0) && (
                <>
                    <div ref={emblaRef}>
                        <Box className={classes.container}>
                            {organizations.length === 0 && (
                                <Box className={classes.slide}>
                                    <OrganizationEmpty organizations={organizationsWhenEmpty} variant="widget" />
                                </Box>
                            )}
                            {(organizations.length > 0 ? organizations : sortBy('name', organizationsWhenEmpty)).map(
                                (organization) => (
                                    <Box
                                        key={organization.slug}
                                        className={classes.slide}
                                        data-testid="OrganizationCard"
                                    >
                                        <OrganizationCard organization={organization} variant="widget" />
                                    </Box>
                                ),
                            )}
                        </Box>
                    </div>
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
        </Box>
    );
};

export default WidgetOrganizationList;
