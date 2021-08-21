import React, { ReactElement } from 'react';
import About from '.';

export default {
    title: 'About',
};

export const Default = (): ReactElement => (
    <About
        countries={[
            { code: 'AU', name: 'Australia', region: 'Australia and New Zealand' },
            { code: 'NZ', name: 'New Zealand', region: 'Australia and New Zealand' },
            { code: 'US', name: 'United States', region: 'Northern America' },
        ]}
    />
);
