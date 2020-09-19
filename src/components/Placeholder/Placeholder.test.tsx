import React from 'react';
import { render } from '@testing-library/react';
import Placeholder from '.';

describe('Placeholder', () => {
    it('should contain Partner With Us link', () => {
        const { getByTestId } = render(<Placeholder />);
        expect(getByTestId('partnerWithUs')).toHaveAttribute('href', 'mailto:elliot@livefortomorrow.co');
    });

    it('should contain Join the launch mailing list link', () => {
        const { getByTestId } = render(<Placeholder />);
        expect(getByTestId('launchMailingList')).toHaveAttribute(
            'href',
            'https://livefortomorrow.typeform.com/to/ErmyL3tv',
        );
    });
});
