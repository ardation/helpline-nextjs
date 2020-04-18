import React, { ReactElement, Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Box } from '@material-ui/core';
import OrganizationCard, { Organization } from '../OrganizationCard/OrganizationCard';
import formatArrayIntoSentence from '../../util/formatArrayIntoSentence';
import NavBar from '../NavBar';

type Props = {
    country: { name: string };
    subdivision?: { name: string };
    topics: string[];
    organizations: Organization[];
};

const useStyles = makeStyles(() => createStyles({}));

const OrganizationList = ({ country, subdivision, topics, organizations }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Fragment>
            <NavBar />
            <Container maxWidth="xs">
                <Box my={2}>
                    <Typography variant="h6">
                        {`Best helplines in ${subdivision ? `${subdivision.name}, ` : ''}${country.name}${
                            topics.length > 0 ? ` for ${formatArrayIntoSentence(topics).toLowerCase()}` : ''
                        }.`}
                    </Typography>
                </Box>
                {organizations.map((organization) => (
                    <Box key={organization.slug} my={2}>
                        <OrganizationCard organization={organization} />
                    </Box>
                ))}
            </Container>
        </Fragment>
    );
};

export default OrganizationList;
