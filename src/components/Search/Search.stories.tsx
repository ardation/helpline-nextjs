import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import { LocalityEnum } from '../../../types/globalTypes';
import Search from '.';

export default {
    title: 'Search',
};

const countries = [
    {
        code: 'AU',
        name: 'Australia',
        subdivisions: [],
        locality: LocalityEnum.LOCATION,
        region: 'Australia and New Zealand',
    },
    {
        code: 'NZ',
        name: 'New Zealand',
        subdivisions: [
            { name: 'Bay of Plenty', code: 'BOP' },
            { name: 'Auckland', code: 'AUK' },
        ],
        locality: LocalityEnum.LOCATION,
        region: 'Australia and New Zealand',
    },
];

const topics = [{ name: 'Anxiety' }, { name: 'Bullying' }];

export const Default = (): ReactElement => <Search countries={countries} topics={topics} showAbout />;

export const WhenEmbed = (): ReactElement => (
    <Box m={2}>
        <Search countries={countries} topics={topics} variant="embed" />
    </Box>
);
export const withTopic = (): ReactElement => (
    <Box m={2}>
        <Search countries={countries} topics={topics} topic={{ name: 'Anxiety' }} />
    </Box>
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
