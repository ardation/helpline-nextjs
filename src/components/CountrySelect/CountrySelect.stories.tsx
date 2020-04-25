import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { Box } from '@material-ui/core';
import CountrySelect from '.';

export default {
    title: 'CountrySelect',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <CountrySelect
            countries={[
                { code: 'AU', name: 'Australia', subdivisions: [] },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                    subdivisions: [
                        { name: 'Bay of Plenty', code: 'BOP' },
                        { name: 'Auckland', code: 'AUK' },
                    ],
                },
            ]}
            onCountryChange={action('onCountryChange')}
            onSubdivisionChange={action('onSubdivisionChange')}
        />
    </Box>
);

export const WithPreselectedCountry = (): ReactElement => (
    <Box m={2}>
        <CountrySelect
            countries={[
                { code: 'AU', name: 'Australia', subdivisions: [] },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                    subdivisions: [
                        { name: 'Bay of Plenty', code: 'BOP' },
                        { name: 'Auckland', code: 'AUK' },
                    ],
                },
            ]}
            preselectedCountry={{ code: 'AU', name: 'Australia', subdivisions: [] }}
            onCountryChange={action('onCountryChange')}
            onSubdivisionChange={action('onSubdivisionChange')}
        />
    </Box>
);

export const WithInline = (): ReactElement => (
    <Box m={2}>
        <CountrySelect
            countries={[
                { code: 'AU', name: 'Australia', subdivisions: [] },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                    subdivisions: [
                        { name: 'Bay of Plenty', code: 'BOP' },
                        { name: 'Auckland', code: 'AUK' },
                    ],
                },
            ]}
            preselectedCountry={{
                code: 'NZ',
                name: 'New Zealand',
                subdivisions: [
                    { name: 'Bay of Plenty', code: 'BOP' },
                    { name: 'Auckland', code: 'AUK' },
                ],
            }}
            onCountryChange={action('onCountryChange')}
            onSubdivisionChange={action('onSubdivisionChange')}
            inline
        />
    </Box>
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
