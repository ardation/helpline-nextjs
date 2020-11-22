import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import { LocalityEnum } from '../../../types/globalTypes';
import Search from '.';

export default {
    title: 'Search',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <Search
            countries={[
                { code: 'AU', name: 'Australia', subdivisions: [], locality: LocalityEnum.LOCATION },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                    subdivisions: [
                        { name: 'Bay of Plenty', code: 'BOP' },
                        { name: 'Auckland', code: 'AUK' },
                    ],
                    locality: LocalityEnum.LOCATION,
                },
            ]}
            topics={[{ name: 'Anxiety' }, { name: 'Bullying' }]}
        />
    </Box>
);

export const WhenEmbed = (): ReactElement => (
    <Box m={2}>
        <Search
            countries={[
                { code: 'AU', name: 'Australia', subdivisions: [], locality: LocalityEnum.LOCATION },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                    subdivisions: [
                        { name: 'Bay of Plenty', code: 'BOP' },
                        { name: 'Auckland', code: 'AUK' },
                    ],
                    locality: LocalityEnum.LOCATION,
                },
            ]}
            topics={[{ name: 'Anxiety' }, { name: 'Bullying' }]}
            variant="embed"
        />
    </Box>
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
