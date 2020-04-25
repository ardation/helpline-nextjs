import React from 'react';
import { render } from '@testing-library/react';
import EmbedLink from '.';

describe('EmbedLink', () => {
    it('should render EmbedLink container', () => {
        const { getByTestId } = render(<EmbedLink />);
        expect(getByTestId('embedContainer')).toBeTruthy();
    });
});
