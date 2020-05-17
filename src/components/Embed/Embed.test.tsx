import React from 'react';
import { render } from '@testing-library/react';
import Embed from '.';

describe('Embed', () => {
    const countries = [
        { code: 'AU', name: 'Australia' },
        {
            code: 'NZ',
            name: 'New Zealand',
        },
        { code: 'US', name: 'United States of America' },
    ];

    it('should render EmbedInfo with countries', () => {
        const { getByTestId, getByAltText } = render(<Embed countries={countries} />);
        expect(getByTestId('embedContainer')).toBeTruthy();
        expect(getByAltText('find a helpline')).toBeTruthy();
        expect(getByTestId('typographyOne')).toBeTruthy();
        expect(getByTestId('typographyTwo')).toBeTruthy();
        expect(getByTestId('typographyThree')).toBeTruthy();
        expect(getByTestId('dropdownForm')).toBeTruthy();
    });
});
