import React, { ReactElement } from 'react';
import Topic from '.';

export default {
    title: 'Topic',
};

export const Default = (): ReactElement => (
    <Topic
        countries={[
            { code: 'AU', name: 'Australia', region: 'Australia and New Zealand' },
            { code: 'NZ', name: 'New Zealand', region: 'Australia and New Zealand' },
            { code: 'US', name: 'United States', region: 'Northern America' },
        ]}
        topic={{ name: 'Anxiety', slug: 'anxiety' }}
    />
);

export const WithHotlineText = (): ReactElement => (
    <Topic
        countries={[
            { code: 'AU', name: 'Australia', region: 'Australia and New Zealand' },
            { code: 'NZ', name: 'New Zealand', region: 'Australia and New Zealand' },
            { code: 'US', name: 'United States', region: 'Northern America' },
        ]}
        topic={{ name: 'Suicidal Thoughts', slug: 'suicidal-thoughts' }}
    />
);
