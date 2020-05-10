import React, { ReactElement } from 'react';
import Embed from '.';

export default {
    title: 'Embed',
};

export const Default = (): ReactElement => (
    <Embed
        countries={[
            { code: 'AU', name: 'Australia' },
            { code: 'NZ', name: 'New Zealand' },
            { code: 'US', name: 'United States of America' },
        ]}
    />
);
