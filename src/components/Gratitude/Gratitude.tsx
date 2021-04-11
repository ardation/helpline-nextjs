import { Box, Button, Container, Divider, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import NextLink from 'next/link';
import gratitude from '../../../docs/gratitude.md';
import Markdown from '../Markdown';

const Gratitude = (): ReactElement => {
    return (
        <>
            <Markdown source={gratitude} />
            <Container maxWidth="sm">
                <Divider />
            </Container>
            <Box py={5} bgcolor="background.paper">
                <Container maxWidth="xs">
                    <Box mb={6} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Want to partner?
                            <br />
                            Got a question?
                        </Typography>
                        <Typography>
                            Our partners include helplines, not-for-profits, universities, social networks, technology
                            companies, and social influencers.
                        </Typography>
                    </Box>
                    <NextLink href="/contact" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            size="large"
                            endIcon={<ArrowRightAltRoundedIcon />}
                        >
                            Get in touch
                        </Button>
                    </NextLink>
                </Container>
            </Box>
        </>
    );
};

export default Gratitude;
