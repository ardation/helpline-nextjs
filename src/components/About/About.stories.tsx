import React, { ReactElement } from 'react';
import About from '.';

export default {
    title: 'About',
};

export const Default = (): ReactElement => (
    <About
        countries={[
            { code: 'AU', name: 'Australia' },
            { code: 'NZ', name: 'New Zealand' },
        ]}
        navBar
    />
);
