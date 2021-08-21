import React, { ReactElement } from 'react';
import CountryAccordian from '.';

export default {
    title: 'CountryAccordian',
};

export const Default = (): ReactElement => (
    <CountryAccordian
        countries={[
            { code: 'AU', name: 'Australia', region: 'Australia and New Zealand' },
            { code: 'NZ', name: 'New Zealand', region: 'Australia and New Zealand' },
            { code: 'US', name: 'United States', region: 'Northern America' },
        ]}
    />
);

export const WithTopic = (): ReactElement => (
    <CountryAccordian
        countries={[
            { code: 'AU', name: 'Australia', region: 'Australia and New Zealand' },
            { code: 'NZ', name: 'New Zealand', region: 'Australia and New Zealand' },
            { code: 'US', name: 'United States', region: 'Northern America' },
        ]}
        topic={{ slug: 'anxiety' }}
    />
);
