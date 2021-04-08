import React, { ReactElement } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import gratitude from '../../../docs/gratitude.md';
import Markdown from '../Markdown';

const Gratitude = (): ReactElement => {
    return (
        <Box bgcolor="background.paper" py={2}>
            <Container>
                <Typography component="div">
                    <Markdown source={gratitude} />
                </Typography>
            </Container>
        </Box>
    );
};

export default Gratitude;
