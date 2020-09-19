import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Organization = {
    slug: string;
    rating: number;
    reviewCount: number;
};

type Props = {
    organization: Organization;
    variant?: 'widget' | 'item';
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            color: theme.palette.text.primary,
        },
    }),
);

const OrganizationRating = ({ organization, variant }: Props): ReactElement => {
    const classes = useStyles();

    return (
        organization.reviewCount > 0 && (
            <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                    <Typography>{organization.rating.toFixed(1)}</Typography>
                </Grid>
                <Grid item>
                    <Rating name="rating" value={organization.rating} size="large" readOnly />
                </Grid>
                <Grid item>
                    <Typography>
                        {variant === 'item' && <>({organization.reviewCount})</>}
                        {variant !== 'item' && (
                            <>
                                {'('}
                                <Link href="/organizations/[slug]" as={`/organizations/${organization.slug}`} passHref>
                                    <a
                                        data-testid="reviewsLink"
                                        className={classes.link}
                                        target={variant === 'widget' ? '_blank' : '_self'}
                                        rel={variant === 'widget' ? 'noopener noreferrer' : ''}
                                    >
                                        {organization.reviewCount}
                                    </a>
                                </Link>
                                {')'}
                            </>
                        )}
                    </Typography>
                </Grid>
            </Grid>
        )
    );
};

export default OrganizationRating;
