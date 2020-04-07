import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Box } from '@material-ui/core';
import CountrySelect from '.';

storiesOf('CountrySelect', module).add(
    'default',
    () => {
        return (
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
    },
    { chromatic: { diffThreshold: 0.7 } },
);
