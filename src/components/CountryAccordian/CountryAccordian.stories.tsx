import React, { ReactElement } from 'react';
import CountryAccordian from '.';

export default {
    title: 'CountryAccordian',
};

export const Default = (): ReactElement => (
    <CountryAccordian
        countries={[
            { code: 'AU', name: 'Australia', subregion: 'Australia and New Zealand' },
            { code: 'NZ', name: 'New Zealand', subregion: 'Australia and New Zealand' },
            { code: 'US', name: 'United States', subregion: 'Northern America' },
        ]}
    />
);
