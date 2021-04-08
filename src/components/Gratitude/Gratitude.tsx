import React, { ReactElement } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import gratitude from '../../../docs/gratitude.md';

const Gratitude = (): ReactElement => {
    return (
        <Box bgcolor="background.paper" py={2}>
            <Container>
                <Typography component="div">
                    <ReactMarkdown source={gratitude} escapeHtml={false} />
                </Typography>
            </Container>
        </Box>
    );
};

export default Gratitude;
