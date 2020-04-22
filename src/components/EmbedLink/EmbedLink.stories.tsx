import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import EmbedLink from '.';

export default {
    title: 'Embed',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <EmbedLink />
    </Box>
);

Default.story = {
    name: 'default',
};
