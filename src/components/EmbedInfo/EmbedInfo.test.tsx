import React from 'react';
import { render } from '@testing-library/react';
import EmbedInfo from '.';

describe('EmbedInfo', () => {
    const countries = [
        { code: 'AU', name: 'Australia' },
        {
            code: 'NZ',
            name: 'New Zealand',
        },
        { code: 'US', name: 'United States of America' },
    ];

    it('should render EmbedInfo container', () => {
        const { getByTestId } = render(<EmbedInfo countries={countries} />);
        expect(getByTestId('embedContainer')).toBeTruthy();
    });
});
