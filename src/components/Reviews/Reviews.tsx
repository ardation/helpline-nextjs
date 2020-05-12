import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Container, Box, Grid, NoSsr } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Moment from 'react-moment';

type Review = {
    rating: number;
    content?: string;
    createdAt: string;
};

interface Props {
    reviews: Review[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            backgroundColor: '#F0F1F5',
        },
        container: {
            display: 'grid',
            gridGap: theme.spacing(2),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(4),
        },
        ratingItem: {
            lineHeight: 0.9,
        },
        rating: {
            fontSize: '1.3rem',
            color: theme.palette.text.primary,
        },
        review: {
            border: '1px solid #000',
            borderRadius: '10px',
            padding: theme.spacing(2),
        },
        title: {
            fontWeight: 'bold',
        },
    }),
);

const Reviews = ({ reviews }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Container maxWidth="sm" className={classes.container}>
                <Typography variant="h6" className={classes.title}>
                    Read reviews
                </Typography>
                {reviews.map(({ rating, content, createdAt }, index) => (
                    <Box key={index} className={classes.review}>
                        <Grid container alignItems="flex-end" spacing={1}>
                            <Grid item className={classes.ratingItem}>
                                <Rating readOnly value={rating} className={classes.rating} />
                            </Grid>
                            <Grid item>
                                <NoSsr>
                                    <Typography>
                                        <small>
                                            <Moment fromNow>{createdAt}</Moment>
                                        </small>
                                    </Typography>
                                </NoSsr>
                            </Grid>
                        </Grid>
                        {content && (
                            <Box mt={1}>
                                <Typography>{content}</Typography>
                            </Box>
                        )}
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default Reviews;
