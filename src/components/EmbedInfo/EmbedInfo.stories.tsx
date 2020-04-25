import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import EmbedInfo from '.';

export default {
    title: 'EmbedInfo',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <EmbedInfo />
    </Box>
);

Default.story = {
    name: 'default',
};

export const WithCountries = (): ReactElement => (
    <Box m={2}>
        <EmbedInfo
            countries={[
                { code: 'AU', name: 'Australia' },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                },
                { code: 'US', name: 'United States of America' },
            ]}
        />
    </Box>
);

WithCountries.story = {
    name: 'with countries',
};
