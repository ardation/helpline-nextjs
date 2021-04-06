import React, { ReactElement } from 'react';
import { Container, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import gratitude from '../../../docs/gratitude.md';

const Gratitude = (): ReactElement => {
    return (
        <Container>
            <Typography component="div">
                <ReactMarkdown source={gratitude} escapeHtml={false} />
            </Typography>
        </Container>
    );
};

export default Gratitude;
